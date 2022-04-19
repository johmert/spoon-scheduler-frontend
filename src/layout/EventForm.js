import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { createDay, createEvent, readDay, readEvent, updateEvent } from "../utils/api";
import SpoonToast from "./SpoonToast";


function EventForm({mode, user}) {
    const initialState = {
        name: '',
        description: '',
        spoons: 0,
        timeDuration: 0,
        importance: 0,
        date: '',
        event_id: null,
    }

    const [day, setDay] = useState();
    const [disabled, setDisabled] = useState(false);
    const [event, setEvent] = useState(initialState);
    const [form, setForm] = useState();
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [spoonValue, setSpoonValue] = useState(0);
    const abortController = new AbortController();
    const history = useHistory();
    const { date, eventId } = useParams();
    const userId = user.user_id;

    useEffect(() => {
        async function getEvent() {
            if(mode === "create") return;
            try {
                const response = await readEvent(date, eventId, userId, abortController.signal);
                setEvent(response);
                setForm({ 
                    name: response.name, 
                    description: response.description,
                    spoons: response.spoons,
                    timeDuration: response.timeDuration,
                    importance: response.importance,
                    date: response.date
                });
            } catch(error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        getEvent();
        return () => {
            abortController.abort();
        };
        // eslint-disable-next-line
    }, [mode, date, eventId, userId]);


    // TODO: fix this!! Need to be able to check if date exists before creating new event
    // ---> maybe check out your old code from Project Flashcards? Think of how Deck & Cards related there
    async function getDay() {
        try {
            const response = await readDay(form.date, userId, abortController.signal);
            if(response) return;
            
            const newDay = {
                date: form.date,
                day_left: 1440,
                max_spoons: (user.avg_spoons * 2),
                user_id: userId
            }
            await createDay(newDay, userId, abortController.signal);
        } catch(error) {
            if(error.name !== "AbortError") {
                throw error;
            }
        }
    }

    function handleImportance(e) {
        e.target.value === 'on' ?
            setForm({...form, importance: 1 }) :
            setForm({...form, importance: 0 });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const newEvent = {
            name: form.name,
            description: form.description,
            spoons: form.spoons,
            timeDuration: form.timeDuration,
            importance: form.importance,
            date: form.date
        }
        if(mode === 'edit') {
            newEvent.event_id = event.event_id;
            await updateEvent(newEvent, userId, abortController.signal);
            history.push("/");
        } else if(mode === 'create') {
            await createEvent(newEvent, userId, abortController.signal);
            history.push("/");
        }
        
    }
    
    function handleTimeDurationChange(e, menuType) {
        if(menuType === 'hours') {
            setHours((e.target.value)*60);
        } else if (menuType === 'minutes') {
            setMinutes(e.target.value);
        }
        setForm({ ...form, timeDuration: hours+minutes });
    }

    

    return (
        <Container>
            <h1 className="text-center">{mode.charAt(0).toUpperCase() + mode.slice(1)}{" Event"}</h1>
            <Form className="container" onSubmit={handleSubmit}>
                <Form.Label>Event Name: </Form.Label>
                <Form.Control className="mb-3" type="text" onChange={e => setForm({...form, name: e.target.value})} />
                <div className="d-flex justify-content-between">
                    <SpoonToast />
                    <Form.Check className="mb-3" type="switch" label="Important" onChange={e => handleImportance(e)} /> 
                </div>
                <Form.Label>Spoons: </Form.Label>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Range max={10} value={spoonValue} onChange={e => { setSpoonValue(parseInt(e.target.value)); setForm({...form, spoons: spoonValue}) }} />
                    </Col>
                    <Col>
                        <Form.Control value={spoonValue} onChange={e => { setSpoonValue(parseInt(e.target.value)); setForm({...form, spoons: spoonValue}) }} />
                    </Col>
                </Form.Group>
                <Form.Label>Description: </Form.Label>
                <Form.Control className="mb-3" as="textarea" rows={4} onChange={e => setForm({...form, description: e.target.value})} />
                <Form.Label>Date:</Form.Label>
                <Form.Control className="mb-3" type="date" onChange={e => setForm({...form, date: e.target.value})} />
                <Form.Label>Duration: </Form.Label>
                <Form.Check className="mb-3" type="switch" label="All-day" onChange={() => {setDisabled(!disabled); setForm({...form, timeDuration: 1440 })}} />
                <Stack className="mb-3" direction="horizontal">
                    <Form.Select size="sm" className="m-2" disabled={disabled} onChange={e => handleTimeDurationChange(e, 'hours')}>
                        <option className="text-center">Hours</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                    </Form.Select>
                    <Form.Select size="sm" className="m-2" disabled={disabled} onChange={e => handleTimeDurationChange(e, 'minutes')}>
                        <option className="text-center">Minutes</option>
                        <option>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                    </Form.Select>
                </Stack>
                <Stack className="d-flex justify-content-center mb-3">
                    <Button className="mb-3" type="submit">Submit</Button>
                    <Button variant="outline-primary" onClick={() => history.goBack()}>Cancel</Button>
                </Stack>
            </Form>
        </Container>
    );
}

export default EventForm;