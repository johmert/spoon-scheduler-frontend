import React from "react";
import { useHistory } from "react-router-dom";
import { deleteEvent } from "../../utils/api";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

function Event({ date, event, user_id }) {
  const { event_id, name, importance, timeDuration, spoons } = event;
  const abortController = new AbortController();
  const history = useHistory();
  let formatedDate = date;
  if( date ) { 
      formatedDate = formatedDate.split("");
      formatedDate.splice(10);
      formatedDate = formatedDate.join("");
  }
  const hrs = Math.floor(parseInt(timeDuration)/60);
  let mins = parseInt(timeDuration) - (hrs * 60);
  if(mins === 0) mins = "00";

  async function handleDelete() {
    await deleteEvent(formatedDate, event_id, user_id, abortController.signal);
    history.push(`/days/${formatedDate}/`);
    window.location.reload(false);
  }

  return (
    <Container className="border mb-4 mt-4 p-3">
      <Row className="mt-4">
        <Col className="h6">Name</Col>
        <Col className="h6">Important?</Col>
        <Col className="h6">Duration</Col>
        <Col className="h6"># of Spoons</Col>
      </Row>
      <Row>
        <Col>{name}</Col>
        <Col>{importance}</Col>
        <Col>{hrs} hrs {mins} mins</Col>
        <Col className="text-center">{spoons}</Col>
      </Row>
      <Row >
        <Stack className="d-flex justify-content-end mt-4" direction="horizontal">
          <Button 
            className="m-1" 
            variant="primary"
            onClick={() => { history.push(`/days/${formatedDate}/events/${event_id}`); window.location.reload(false); }}>
            View
          </Button>
          <Button 
            className="m-1" 
            variant="info"
            onClick={() => { history.push(`/days/${formatedDate}/events/${event_id}/edit`); window.location.reload(false); }}>
            Edit
          </Button>
          <Button 
            className="m-1" 
            variant="danger"
            onClick={handleDelete}>
            X Delete
          </Button>
        </Stack>
      </Row>
    </Container>
  );
}

export default Event;
