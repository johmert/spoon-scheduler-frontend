import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { readEvent } from "../../utils/api";

function Event({ d, id, user }) {
  const { user_id } = user;
  const initialState = {
    name: "",
    description: "",
    spoons: 0,
    timeDuration: 0,
    importance: 0,
    date: "",
    event_id: id,
  };
  const [event, setEvent] = useState(initialState);

  useEffect(() => {
    const abortController = new AbortController();
    async function getEvent() {
      try {
        const response = await readEvent(
          d,
          id,
          user_id,
          abortController.signal
        );
        setEvent(response);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    getEvent();
    return () => {
      abortController.abort();
    };
  }, [d, id, user_id]);

  return (
    <Container>
      <Row>
        <Col>Name</Col>
        <Col>Important?</Col>
        <Col>Duration</Col>
        <Col># of Spoons</Col>
      </Row>
      <Row>
        <Col>{event.name}</Col>
        <Col>{event.importance}</Col>
        <Col>{event.timeDuration}</Col>
        <Col>{event.spoons}</Col>
      </Row>
    </Container>
  );
}

export default Event;
