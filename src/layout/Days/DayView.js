import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { readDay } from "../../utils/api";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Event from "../Events/Event";

function DayView({date, user}) {
    const { user_id } = user;
    const initialDayState = {
        date: '',
        day_left: 0,
        events: [{}],
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
    
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
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

    }, [day.events, date, events, user_id])

    const eventsListed = events.map((event, key) => 
        <Container key={key}>
            <Row className="mt-4">
                <Col className="h6">Name</Col>
                <Col className="h6">Important?</Col>
                <Col className="h6">Duration</Col>
                <Col className="h6"># of Spoons</Col>
            </Row>
            <Row>
                <Event date={day.date} event={event} user_id={user_id} />
            </Row>
        </Container>
        
    );
    

    return (
        <Container>
            <Row className="mt-2">
                <Col className="d-flex justify-content-end">
                    <Button
                        className="m-1" 
                        variant="info" 
                        onClick={() => { history.push(`/days/${date}/edit`); window.location.reload(false); }}>
                        Edit
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="h2 text-center">{date}</Col>
            </Row>
            <Row>
                <Col className="text-center">Available Time</Col>
                <Col className="text-center">Scheduled Spoons</Col>
                <Col size="sm"></Col>
                <Col className="text-center">Maximum Spoons</Col>
            </Row>
            <Row>
                <Col className="m-2 text-center">{day.day_left}</Col>
                <Col className="m-2 text-center">{totalSpoons}</Col>
                <Col className="m-2 text-center" size="sm">/</Col>
                <Col className="m-2 text-center">{day.max_spoons}</Col>
            </Row>
            <Row>
                <Stack>
                    <Button 
                        className="m-3" 
                        variant="primary"
                        onClick={() =>{ history.push(`/days/${date}/events/add`); window.location.reload(false); }}>
                        + Add Event
                    </Button>
                </Stack>
            </Row>
            {eventsListed}
        </Container>
    );
}

export default DayView;