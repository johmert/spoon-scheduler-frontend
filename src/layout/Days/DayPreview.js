import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

function DayPreview({ day }) {
    let formatedDate = day.date.split("");
        formatedDate.splice(10);
        formatedDate = formatedDate.join("");

    const { day_left, events, max_spoons } = day;
    const history = useHistory();
    const numberOfEvents = events ? events.length : 0;
    const eventSpoons = events ? day.events.map(event => event.spoons) : [0];
    const totalSpoons = eventSpoons.reduce((prev, current) => prev + current, 0);

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
                <Col className="text-center">{totalSpoons}</Col>
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

export default DayPreview;