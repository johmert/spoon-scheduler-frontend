import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { readEvent } from "../utils/api";

function Event({date, id, userId}) {
    const initialState = {
        name: '',
        description: '',
        spoons: 0,
        timeDuration: 0,
        importance: 0,
        date: '',
        event_id: id
    };
    const [event, setEvent] = useState(initialState);

    useEffect(() => {
        const abortController = new AbortController();
        async function getEvent() {
            try {
                const response = readEvent(date, id, userId, abortController.signal);
                setEvent(response);
            } catch(error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        getEvent();
        return () => {
            abortController.abort();
        }
    }, [date, id, userId]);


    return (
    <Container>
        <p className="h2">{event.spoons}</p>
    </Container>
    );
}

export default Event;