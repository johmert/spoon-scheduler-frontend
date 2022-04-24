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
    let formattedDate = d.split('');
        formattedDate.splice(10);
        formattedDate = formattedDate.join('');
    const displayDate = new Date(formattedDate).toDateString();
    const initialState = {
        name: '',
        date: formattedDate,
        description: '',
        spoons: 0,
        timeDuration: 0,
    }
    const [event, setEvent] = useState(initialState);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const { description, name, spoons } = event;
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        async function getEvent() {
            try {
                const response = await readEvent(formattedDate, eventId, user_id, abortController.signal);
                setEvent({...response, date: formattedDate });
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
    }, [formattedDate, eventId, user_id]);

    async function handleDelete() {
        const abortController2 = new AbortController();
        try{
            await deleteEvent(formattedDate, eventId, user_id, abortController2.signal);
        } catch(error) { 
            if(error.name !== "AbortError") throw error; 
        }
        history.push(`/days/${formattedDate}/`);
        window.location.reload(false);
      }

    return (
        <Container fluid>
            <Row>
                <Stack className="d-flex justify-content-end mt-2" direction="horizontal">
                    <Button 
                        className="m-2" 
                        variant="info"
                        onClick={() => { history.push(`/days/${formattedDate}/events/${eventId}/edit`); window.location.reload(false); }}>
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
                <Col className="h3 m-2 text-center">{name}</Col>
            </Row>
            <Row>
                <Col className="h5 m-2 text-center">{spoons} Spoons</Col>
                <Col className="h5 m-2 text-center">{hours} hrs {minutes} mins</Col>
            </Row>
            <Row>
                <Col className="m-3 text-center">{description}</Col>
            </Row>
        </Container>
    );
}

export default EventView;