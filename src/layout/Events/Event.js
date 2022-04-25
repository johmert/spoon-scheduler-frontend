import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteEvent } from "../../utils/api";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

function Event({ date, event, user_id }) {
  const { event_id } = event;
  const [displayDate, setDisplayDate] = useState('');
  const [displayDescription, setDisplayDescription] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [displaySpoons, setDisplaySpoons] = useState(0);
  const [displayImportance, setDisplayImportance] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState("00");
  const abortController = new AbortController();
  const history = useHistory();
  

  useEffect(() => {
    let formatedDate = date;
    if( date ) { 
      formatedDate = formatedDate.split("");
      formatedDate.splice(10);
      formatedDate = formatedDate.join("");
    }
    if( event ) {
      setDisplayDate(formatedDate);
      setDisplayDescription(event.description);
      setDisplayName(event.name);
      setDisplaySpoons(event.spoons);
      if(event.important !== undefined) setDisplayImportance(event.important.toString());
      const hrs = Math.floor(parseInt(event.timeDuration)/60);
      let mins = parseInt(event.timeDuration) - (hrs * 60);
      if(mins === 0) mins = "00";
      
      setHours(hrs);
      setMinutes(mins);
    }

  }, [date, event])

  async function handleDelete() {
    if(window.confirm("Delete Event?\n\nYou will notbe able to recover it.")){
      try{
          await deleteEvent(displayDate, event_id, user_id, abortController.signal);
      } catch(error) { 
          if(error.name !== "AbortError") throw error; 
      }
      history.push(`/days/${displayDate}/`);
      window.location.reload(false);
    }
  }

  return (
    <Container className="border mb-4 mt-4 p-3">
      <Row className="mt-4">
        <Col className="h6">Important?</Col>
        <Col className="h6">Duration</Col>
        <Col className="h6"># of Spoons</Col>
      </Row>
      <Row>
        <Col>{displayImportance}</Col>
        <Col>{hours} hrs {minutes} mins</Col>
        <Col className="text-center">{displaySpoons}</Col>
      </Row>
      <Row>
        <Col className="display-4 m-2 p-1">{displayName}</Col>
      </Row>
      <Row>
        <Col className="h3 m-2 p-1 text-muted">{displayDescription}</Col>
      </Row>
      <Row className="d-flex flex-wrap">
        <Stack className="d-flex justify-content-end mt-4" direction="horizontal">
          <Button 
            className="m-1" 
            variant="info"
            onClick={() => { history.push(`/days/${displayDate}/events/${event_id}/edit`); window.location.reload(false); }}>
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
