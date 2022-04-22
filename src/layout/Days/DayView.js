import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDay } from "../../utils/api";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Event from "../Events/Event";

function DayView({user}) {
    const { user_id } = user;
    const initialDayState = {
        date: '',
        day_left: 0,
        events: [],
        max_spoons: 0,
        user_id: user_id
    }
    const initialEventsState = [{
        name: '',
        description: '',
        spoons: 0,
        timeDuration: 0,
        importance: 0,
        date: ''
    }]
    const [day, setDay] = useState(initialDayState)
    const [events, setEvents] = useState(initialEventsState);
    const [totalSpoons, setTotalSpoons] = useState(0);
    const { date } = useParams();
    const abortController = new AbortController();
    const history = useHistory();

    useEffect(() => {
        async function getDay() {
            try{
                const response = await readDay(date, user_id, abortController.signal)
                setDay(response);
            } catch (error) {
                if(error.name !== "AbortError"){
                    throw error;
                }
            }
        }
        getDay();
        setEvents(day.events);
        if(events.length > 1) {
            const eventSpoons = events.map(event => event.spoons);
            const result = eventSpoons.reduce((prev, current) => prev + current, 0);
            setTotalSpoons(result);
        }
        return () => {
            abortController.abort();
        }
        // eslint-disable-next-line
    }, [date, user_id])

    const eventsListed = events.map((event, key) => <Event key={key} id={event.event_id} d={date} user={user} />);
    

    return (
        <Container>
            <Row className="mt-2">
                <Col className="h2 text-center">{date}</Col>
            </Row>
            <Row>
                <Col className="text-center">Available Time</Col>
                <Col className="text-center">Scheduled Spoons /</Col>
                <Col className="text-center">Maximum Spoons</Col>
                <Col></Col>
            </Row>
            <Row>
                <Col className="m-2 text-center">{day.day_left}</Col>
                <Col className="m-2 text-center">{totalSpoons}</Col>
                <Col className="m-2 text-center">{day.max_spoons}</Col>
                <Col className="d-flex justify-content-end">
                    <Button 
                        className="m-2" 
                        variant="primary"
                        onClick={() => history.push(`${date}/addEvent`)}>
                        + Add Event
                    </Button>
                </Col>
            </Row>
            <Stack>{eventsListed}</Stack>
        </Container>
    );
}

export default DayView;