import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { deleteEvent, readEvent } from "../../utils/api";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

function EventView({user_id, d}) {
    const { eventId } = useParams();
    const [displayDate, setDisplayDate] = useState('');
    const [displayDescription, setDisplayDescription] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [displaySpoons, setDisplaySpoons] = useState(0); 
    const [hours, setHours] = useState(0);
    const [important, setImportant] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        let formattedDate = d.split('');
            formattedDate.splice(10);
            formattedDate = formattedDate.join('');
        const dateValue = new Date(formattedDate).toDateString();
        setDisplayDate(dateValue);
        async function getEvent() {
            try {
                const response = await readEvent(formattedDate, eventId, user_id, abortController.signal);
                setDisplayDescription(response.description);
                setDisplayName(response.name);
                setDisplaySpoons(response.spoons);
                setImportant(response.important);
                const hrs = Math.floor(parseInt(response.timeDuration)/60);
                let mins = parseInt(response.timeDuration) - (hrs * 60);
                if(mins === 0) mins = "00";
                setHours(hrs);                    
                setMinutes(mins);
            } catch(error) {
                if(error.name !== "AbortError") throw error;
            }
        }
        getEvent();
        return () => {
            abortController.abort();
        }
    }, [d, eventId, user_id])

    async function handleDelete() {
        const abortController2 = new AbortController();
        if(window.confirm("Delete Event?\n\nYou will notbe able to recover it.")){
            try{
                await deleteEvent(displayDate, eventId, user_id, abortController2.signal);
            } catch(error) { 
                if(error.name !== "AbortError") throw error; 
            }
        }
        history.push(`/days/${displayDate}/`);
        window.location.reload(false);
      }

    return (
        <Container fluid>
            <Row>
                <Stack className="d-flex justify-content-end mt-2" direction="horizontal">
                    <Button 
                        className="m-2" 
                        variant="info"
                        onClick={() => { history.push(`/days/${displayDate}/events/${eventId}/edit`); window.location.reload(false); }}>
                        Edit
                    </Button>
                    <Button 
                        className="m-2" 
                        variant="danger" 
                        onClick={handleDelete}>
                        X Delete
                    </Button>
                </Stack>
            </Row>
            <Row>
                <Col className="h6 mt-4 text-center">{displayDate}</Col>
            </Row>
            <Row>
                <Col className="h3 m-2 text-center">{displayName}</Col>
            </Row>
            <Row>
                <Col className="h5 m-2 text-center" hidden={!important} variant="danger">Important</Col>
                <Col className="h5 m-2 text-center">{displaySpoons} Spoons</Col>
                <Col className="h5 m-2 text-center">{hours} hrs {minutes} mins</Col>
            </Row>
            <Row>
                <Col className="m-3 text-center">{displayDescription}</Col>
            </Row>
        </Container>
    );
}

export default EventView;