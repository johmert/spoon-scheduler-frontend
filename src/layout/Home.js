import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { readUser } from "../utils/api/index";
import DayForm from "./Days/DayForm";
import DayView from "./Days/DayView";
import Event from "./Events/Event";
import EventForm from "./Events/EventForm";
import Navigation from "../utils/Navigation";
import Schedule from "./Schedule";

function Home({userId, setToken}) {
    const initialState = {
        user_id: userId,
        username: '',
        settings: '',
        avg_spoons: 0,
        days: []
    }
    const [user, setUser] = useState(initialState);
    const [settings, setSettings] = useState('3-day');
    
    useEffect(() => {
        const abortController = new AbortController();
        async function getUser() {
            try {
                const response = await readUser(userId, abortController.signal);
                setUser(response);
                setSettings(response.settings);
            } catch(error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        getUser();
        return () => {
            abortController.abort();
        }
    }, [userId]);

    return (
        <div>
            <Navigation setSettings={setSettings} setToken={setToken} />
            <Switch>
                <Route path={`/:date/:eventId/editEvent`}>
                    <EventForm mode="edit" userId={user} />
                </Route>
                <Route path="/:date/addEvent">
                    <EventForm mode="create" user={user} />
                </Route>
                <Route path={`/:date/:eventId`}>
                    <Event />
                </Route>
                <Route exact path="/addDay">
                    <DayForm mode="create" user={user} />
                </Route>
                <Route path={`/:date`}>
                    <DayView />
                </Route>
                <Route exact path="/">
                    <Schedule mode={settings} user={user} setSettings={setSettings} />
                </Route>
                <Route>
                    <div className="d-flex justify-content-center">
                        <p className="h2">Page Not Found!</p>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default Home;