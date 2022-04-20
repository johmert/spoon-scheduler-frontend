import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { readUser } from "../utils/api/index";
import DayForm from "./DayForm";
import Event from "./Event";
import EventForm from "./EventForm";
import Navigation from "./Navigation";
import Schedule from "./Schedule";

function Home({userId}) {
    const initialState = {
        user_id: userId,
        username: '',
        settings: '',
        avg_spoons: 0
    }
    const [user, setUser] = useState(initialState);
    const [settings, setSettings] = useState('');
    
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
            <Navigation setSettings={setSettings}/>
            <Switch>
                <Route path={`/${user.user_id}/:date/:eventId/editEvent`}>
                    <EventForm mode="edit" userId={user} />
                </Route>
                <Route path={`/${user.user_id}/:date/:eventId`}>
                    <Event />
                </Route>
                <Route path={`/${user.user_id}/:date`}>
                    <Schedule mode="1-day" user={user} />
                </Route>
                <Route exact path="/addDay">
                    <DayForm mode="create" user={user} />
                </Route>
                <Route exact path="/addEvent">
                    <EventForm mode="create" user={user} />
                </Route>
                <Route exact path="/">
                    <Schedule mode={settings} user={user} />
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