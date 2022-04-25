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
    const [day, setDay] = useState({...initialDayState})
    const [events, setEvents] = useState([]);
    const [totalSpoons, setTotalSpoons] = useState(0);
    const displayDate = new Date(d).toDateString();
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
        }
        if(day.events) {
            setEvents(day.events);
            const eventSpoons = day.events !== null ? day.events.map(event => event.spoons) : 0;
            const totalSpoonsLocal = eventSpoons.reduce((prev, current) => prev + current, 0);
            const totalSpoonsValue = !isNaN(totalSpoonsLocal) ? totalSpoonsLocal : 0;
            setTotalSpoons(totalSpoonsValue);
        }
    }, [d, day.events, days, events]);

    

    const eventsListed = events.map((event, index) => 
        <Event key={index} date={day.date} event={event} user_id={user_id} />
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
                <Col className="h2 text-center">{displayDate}</Col>
            </Row>
            <Row>
                <Col className="text-center">Scheduled Spoons</Col>
                <Col size="sm"></Col>
                <Col className="text-center">Maximum Spoons</Col>
            </Row>
            <Row>
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