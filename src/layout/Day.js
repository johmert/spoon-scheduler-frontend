import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { readDay } from "../utils/api";

function Day({ d, user }) {
    const { user_id } = user;
    const initialState = {
        date: d,
        day_left: 0,
        events: [{}],
        max_spoons: 0,
        user_id: user_id
    };
    const [day, setDay] = useState(initialState);
    const { date, day_left, max_spoons } = day;    

    useEffect(() => {
        const abortController = new AbortController();
        async function getDay() {
            try {
                const response = await readDay(d, user_id, abortController.signal);
                setDay(response);
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
    }, [d, user_id]);

    return (
        <Container>
            <Row>
                <Col>{date}</Col>
                <Col>{max_spoons}</Col>
                <Col>{day_left}</Col>
            </Row>
        </Container>
    );

}

export default Day;