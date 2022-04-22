import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { readDay } from "../../utils/api";

function Day({ d, user }) {
    const { user_id } = user;
    const initialState = {
        date: d,
        day_left: 0,
        events: [],
        max_spoons: 0,
        user_id: user_id
    };
    const [day, setDay] = useState(initialState);
    const [spoons, setSpoons] = useState(0);
    let { date, day_left, events, max_spoons } = day;
    const history = useHistory();
    date = date.split("");
    date.splice(10);
    date = date.join("");

    useEffect(() => {
        const abortController = new AbortController();
        async function getDay() {
            try {
                const response = await readDay(d, user_id, abortController.signal);
                setDay(response);
                if(response.events.length > 0) {
                    const eventSpoons = response.events.map(event => event.spoons);
                    const totalSpoons = eventSpoons.reduce((prev, current) => prev + current, 0);
                    setSpoons(totalSpoons);
                }
            } catch (error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        getDay();
        return () => {
            abortController.abort();
        }
    }, [d, user_id]);

    return (
        <Container>
            <Row>
                <Col className="h6 text-center">Date</Col>
                <Col className="h6 text-center">Available Time</Col>
                <Col className="h6 text-center"># of Events</Col>
                <Col className="h6 text-center">Scheduled Spoons</Col>
                <Col className="h6 text-center">Maximum Spoons</Col>
            </Row>
            <Row>
                <Col className="text-center">{date}</Col>
                <Col className="text-center">{day_left}</Col>
                <Col className="text-center">{events.length}</Col>
                <Col className="text-center">{spoons}</Col>
                <Col className="text-center">{max_spoons}</Col>
                <Stack className="d-flex justify-content-end" direction="horizontal">
                    <Button
                        className="m-1" 
                        variant="outline-primary" 
                        onClick={() => { history.push(`/${date}`); window.location.reload(false); }}>
                        View
                    </Button>
                    <Button
                        className="m-1"
                        variant="primary"
                        onClick={() => { history.push(`/${date}/addEvent`); window.location.reload(false); }}>
                        Add Event
                    </Button>
                </Stack>
                
            </Row>
            
        </Container>
    );

}

export default Day;