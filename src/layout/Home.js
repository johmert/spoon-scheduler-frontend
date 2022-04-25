import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { listDays, readUser } from "../utils/api/index";
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
    const [days, setDays] = useState([]);
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
                if(error.name !== "AbortError") throw error;
            }
        }
        async function getDays() {
            try {
                const response = await listDays(userId, abortController.signal);
                setDays(() => response.data);
            } catch(error) {
                if(error.name !== "AbortError") throw error;
            }
        }
        getUser();
        getDays();
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
                        <DayForm mode="create" user_id={user.user_id} />
                    </Route>
                    <Route path={`/days/:date`}>
                        <Day days={days} user={user} />
                    </Route>
                    <Route exact path="/">
                        <Schedule days={days} mode={settings} setSettings={setSettings} />
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