import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

function DayPreview({ day }) {
    const [displayDate, setDisplayDate] = useState('2022-00-00');
    const [displayEventNumber, setDisplayEventNumber] = useState(0);
    const [displayTotalSpoons, setDisplayTotalSpoons] = useState(0);
    const [displayMaxSpoons, setDisplayMaxSpoons] = useState(0);
    const history = useHistory();
    const dateString = new Date(displayDate).toDateString();

    useEffect(() => {
        if(day){
            let formatedDate = day.date.split("");
                formatedDate.splice(10);
                formatedDate = formatedDate.join("");
            const numberOfEvents = day.events ? day.events.length : 0;
            const eventSpoons = day.events ? day.events.map(event => event.spoons) : [0];
            const totalSpoons = eventSpoons.reduce((prev, current) => prev + current, 0);

            setDisplayDate(formatedDate);
            setDisplayEventNumber(numberOfEvents);
            setDisplayTotalSpoons(totalSpoons);
            setDisplayMaxSpoons(parseInt(day.max_spoons));
        }
        
    }, [day]);


    return (
        <Container className="border mb-4 p-4" variant="preview">
            <Row>
                <Col className="m-2">
                    <Row className="h6">Date</Row>
                    <Row>{dateString}</Row>
                </Col>
                <Col className="m-2">
                    <Row className="h6"># of Events</Row>
                    <Row>{displayEventNumber}</Row>
                </Col>
                <Col className="m-2">
                    <Row className="h6">Scheduled Spoons</Row>
                    <Row>{displayTotalSpoons}</Row>
                </Col>
                <Col className="m-2">
                    <Row className="h6">Max Spoons</Row>
                    <Row>{displayMaxSpoons}</Row>
                </Col>
            </Row>
            <Row className="d-flex flex-wrap">
                <Stack className="d-flex justify-content-end" direction="horizontal">
                    <Button
                        className="m-1" 
                        variant="primary" 
                        onClick={() => { history.push(`/days/${displayDate}`); window.location.reload(false); }}>
                        View
                    </Button>
                    <Button
                        className="m-1" 
                        variant="info" 
                        onClick={() => { history.push(`/days/${displayDate}/edit`); window.location.reload(false); }}>
                        Edit
                    </Button>
                </Stack>
            </Row>
        </Container>
    );

}

export default DayPreview;