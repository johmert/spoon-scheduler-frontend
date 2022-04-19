import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { readUser } from "../utils/api/index";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Stack from "react-bootstrap/Stack"
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
            <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
                <Container className="d-flex justify-content-center">
                    <Navbar.Brand href="/">Spoon Scheduler</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className= "me-auto">
                            <NavDropdown title="View" id="view-dropdown" >
                                <NavDropdown.Item>
                                    <Stack>
                                        <Button className="d-flex justify-content-center mb-2" variant="outline-primary">1-day</Button>
                                        <Button className="d-flex justify-content-center mb-2" variant="outline-primary">3-day</Button>
                                        <Button className="d-flex justify-content-center mb-2" variant="outline-primary">Week</Button>
                                        <Button className="d-flex justify-content-center" variant="outline-primary">Month</Button>
                                    </Stack>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="addEvent">+ Add New Event</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
                <Route path={`/${user.user_id}/:date/:eventId/editEvent`}>
                    <EventForm mode="edit" userId={user} />
                </Route>
                <Route path={`/${user.user_id}/:date/:eventId`}>
                    <Event />
                </Route>
                <Route path={`/${user.user_id}/:date`}>
                    <Schedule mode="day" />
                </Route>
                <Route exact path="/addEvent">
                    <EventForm mode="create" user={user} />
                </Route>
                <Route exact path="/">
                    <Schedule mode={user.settings} />
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