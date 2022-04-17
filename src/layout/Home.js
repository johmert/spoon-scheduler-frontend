import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { readUser } from "../utils/api/index";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Event from "./Event";
import EventForm from "./EventForm";
import Schedule from "./Schedule";

function Home({userId}) {
    const initialState = {
        user_id: userId,
        username: '',
        settings: '',
        avg_spoons: 0
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
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href={`${user.settings}`}>Spoon Scheduler</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className= "me-auto">
                            <Nav.Link href="1-day">1-day</Nav.Link>
                            <Nav.Link href="3-day">3-day</Nav.Link>
                           <Nav.Link href="week">Week</Nav.Link>
                            <Nav.Link href="month">Month</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
                <Route path="/:date/:eventId/editEvent">
                    <EventForm />
                </Route>
                <Route path="/:date/:eventId">
                    <Event />
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