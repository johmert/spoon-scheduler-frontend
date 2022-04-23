import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { readUser } from "../utils/api/index";
import Container from "react-bootstrap/Container";
import Day from "./Days/Day";
import DayForm from "./Days/DayForm";
import Navigation from "../utils/Navigation";
import NotFound from "../utils/NotFound";
import Schedule from "./Schedule";

function Home({userId, setToken}) {
    const initialState = {
        user_id: userId,
        username: '',
        settings: '',
        avg_spoons: 0,
        days: []
    }
    const [settings, setSettings] = useState('3-day');
    const [user, setUser] = useState(initialState);
    
    
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
        <>
            <Navigation setSettings={setSettings} setToken={setToken} />
            <Container>
                <Switch>
                    <Route exact path="/days/add">
                        <DayForm mode="create" user={user} />
                    </Route>
                    <Route path={`/days/:date`}>
                        <Day user={user} />
                    </Route>
                    <Route exact path="/">
                        <Schedule mode={settings} user={user} setSettings={setSettings} />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </Container>
        </>
    )
}

export default Home;