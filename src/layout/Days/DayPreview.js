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
    let formatedDate = d.split("");
        formatedDate.splice(10);
        formatedDate = formatedDate.join("");
    const initialState = {
        date: formatedDate,
        day_left: 0,
        events: [],
        max_spoons: 0,
        user_id: user_id
    };
    const [day, setDay] = useState(initialState);
    const [spoons, setSpoons] = useState(0);
    const { day_left, events, max_spoons } = day;
    const history = useHistory();
    const numberOfEvents = events ? events.length : 0;
    

    useEffect(() => {
        const abortController = new AbortController();
        async function getDay() {
            try {
                const response = await readDay(formatedDate, user_id, abortController.signal);
                setDay(response);
                if(response.events) {
                    if(response.events.length > 0) {
                        const eventSpoons = response.events.map(event => event.spoons);
                        const totalSpoons = eventSpoons.reduce((prev, current) => prev + current, 0);
                        setSpoons(totalSpoons);
                    }
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
    }, [formatedDate, user_id]);

    return (
        <Container className="mb-4">
            <Row>
                <Col className="h6 text-center">Date</Col>
                <Col className="h6 text-center">Available Time</Col>
                <Col className="h6 text-center"># of Events</Col>
                <Col className="h6 text-center">Scheduled Spoons</Col>
                <Col className="h6 text-center">Maximum Spoons</Col>
            </Row>
            <Row className="d-flex flex-wrap">
                <Col className="text-center">{formatedDate}</Col>
                <Col className="text-center">{day_left}</Col>
                <Col className="text-center">{numberOfEvents}</Col>
                <Col className="text-center">{spoons}</Col>
                <Col className="text-center">{max_spoons}</Col>
                <Stack className="d-flex justify-content-end" direction="horizontal">
                    <Button
                        className="m-1" 
                        variant="primary" 
                        onClick={() => { history.push(`/days/${formatedDate}`); window.location.reload(false); }}>
                        View
                    </Button>
                    <Button
                        className="m-1" 
                        variant="info" 
                        onClick={() => { history.push(`/days/${formatedDate}/edit`); window.location.reload(false); }}>
                        Edit
                    </Button>
                </Stack>
            </Row>
        </Container>
    );

}

export default Day;