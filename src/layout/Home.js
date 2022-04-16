import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { readUser } from "../utils/api/index";
import EventForm from "./EventForm";
import Schedule from "./Schedule";

function Home({userId}) {
    const initialState = {
        user_id: userId,
        username: '',
        settings: '',
    }
    const [user, setUser] = useState(initialState);
    
    useEffect(() => {
        const abortController = new AbortController();
        async function getUser() {
            try {
                const response = await readUser(userId, abortController.signal);
                setUser(() => response);
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
    }, [user, userId]);

    return (
        <div>
            <p className="h3">This is the home page</p>
            <p>{user.username}</p>
            <p>{user.avg_spoons}</p>
            <Switch>
                <Route path="/:date/:eventId/editEvent">
                    <EventForm />
                </Route>
                <Route path="/:date/:eventId">
                    <p>read specific event</p>
                </Route>
                <Route path="/:date">
                    <Schedule mode="day" />
                </Route>
                <Route path="/addEvent">
                    <EventForm />
                </Route>
                <Route exact path="/">
                    <Schedule mode={user.settings} />
                </Route>
                <Route>
                    <p>Page Not Found!</p>
                </Route>
            </Switch>
        </div>
    )
}

export default Home;