import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Event from "../Events/Event";

function DayView({d, days, user_id}) {
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
    const [day, setDay] = useState({...initialDayState})
    const [events, setEvents] = useState(initialEventsState);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState('00');
    const [totalSpoons, setTotalSpoons] = useState(0);
    const history = useHistory();

    useEffect(() => {
        if(days) {
            function findDay(element) {
                let date = element.date.split('');
                date.splice(10);
                date = date.join('');
                return date === d;
            }
            const index = days.findIndex(findDay);
            setDay({...days[index]});
            const hrs = Math.floor(parseInt(day.day_left) / 60);
            let mins = parseInt(day.day_left) - (hrs * 60);
            if(mins === 0) mins = "00";
            setHours(hrs);
            setMinutes(mins);
        }
        if(day.events) {
            setEvents(day.events);
            const eventSpoons = events ? day.events.map(event => event.spoons) : [0];
            setTotalSpoons(eventSpoons.reduce((prev, current) => prev + current, 0));
        }
    }, [d, day.day_left, day.events, days, events]);

    const eventsListed = events.map((event, index) => 
        <Container key={index}>
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
                        onClick={() => { history.push(`/days/${d}/edit`); window.location.reload(false); }}>
                        Edit
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="h2 text-center">{d}</Col>
            </Row>
            <Row>
                <Col className="text-center">Available Time</Col>
                <Col className="text-center">Scheduled Spoons</Col>
                <Col size="sm"></Col>
                <Col className="text-center">Maximum Spoons</Col>
            </Row>
            <Row>
                <Col className="m-2 text-center">{hours}:{minutes}</Col>
                <Col className="m-2 text-center">{totalSpoons}</Col>
                <Col className="m-2 text-center" size="sm">/</Col>
                <Col className="m-2 text-center">{day.max_spoons}</Col>
            </Row>
            <Row>
                <Stack>
                    <Button 
                        className="m-3" 
                        variant="primary"
                        onClick={() =>{ history.push(`/days/${d}/events/add`); window.location.reload(false); }}>
                        + Add Event
                    </Button>
                </Stack>
            </Row>
            {eventsListed}
        </Container>
    );
}

export default DayView;