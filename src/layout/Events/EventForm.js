import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { createEvent, readEvent, updateEvent } from "../../utils/api";
import SpoonToast from "../../utils/SpoonToast";


function EventForm({date, mode, user_id}) {
    const { eventId } = useParams();
    const [allDay, setAllDay] = useState(false);
    const [disabled, setDisabled] = useState(false);
    let formatedDate = date;
    if( date ) { 
        formatedDate = formatedDate.split("");
        formatedDate.splice(10);
        formatedDate = formatedDate.join("");
    }
    const initialState = {
        name: '',
        importance: 0,
        spoons: 0,
        description: '',
        hours: 0,
        minutes: 0,
        timeDuration: 0
    }
    const [form, setForm] = useState({...initialState})
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        async function getEvent() {
            if(mode === "create") return;
            try {
                const response = await readEvent(formatedDate, eventId, user_id, abortController.signal);
                const hrs = Math.floor(response.timeDuration / 60);
                const mins = response.timeDuration - (hrs * 60);
                if(hrs === 24) {
                    setAllDay(true);
                    setDisabled(true);
                }
                setForm({...response, hours: hrs, minutes: mins })
            } catch (error) {
                if(error.name !== "AbortError") throw error;
            }
        }
        getEvent();
        return () => {
            abortController.abort();
        }
    }, [eventId, formatedDate, mode, user_id]);

    function handleChange({target}) {
        const { name } = target;
        switch(name) {
            case "name":
                setForm({...form, name: target.value }); 
                break;
            case "importance":
                const impValue = target.checked ? 1 : 0;
                setForm({...form, importance: impValue }); 
                break;
            case "spoons":
                const spValue = parseInt(target.value);
                setForm({...form, spoons: spValue }); 
                break;
            case "description":
                setForm({...form, description: target.value }); 
                break;
            case "all-day":
                setAllDay(!allDay);
                setDisabled(!disabled);
                setForm({...form, allDay: target.checked }); 
                break;
            case "hours":
                const hrValue = parseInt(target.value);
                setForm({...form, hours: hrValue }); 
                break;
            case "minutes":
                const minValue = parseInt(target.value);
                setForm({...form, minutes: minValue });
                break;
            default:
                console.log("something went wrong!")
                break;
        }
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        const abortController2 = new AbortController();
        let newEvent = {
            name: form.name,
            importance: form.importance,
            spoons: form.spoons,
            description: form.description,
            timeDuration: (form.hours * 60) + form.minutes,
            date: formatedDate
        }
        if(mode === "create") {
            try {
                await createEvent(newEvent, user_id, abortController2.signal);
            } catch(error) {
                if(error.name !== "AbortError") throw error;
            }
            history.push(`/days/${date}`);
            window.location.reload(false);
        } else if(mode === "edit") {
            try {
                await updateEvent(newEvent, eventId, user_id, abortController2.signal);
            } catch(error) {
                if(error.name !== "AbortError") throw error;
            }
            history.push(`/days/${date}`);
            window.location.reload(false);
        }

    }

    return (
        <Container className="mt-3 p-2">
            <h1 className="text-center">{mode.charAt(0).toUpperCase() + mode.slice(1)}{" Event"}</h1>
            <Form className="mt-3" onSubmit={handleSubmit}>
            <Form.Label>Event Name: </Form.Label>
                <Form.Group className="d-flex flex-wrap justify-content-between" as={Row}>
                    <Col>
                        <Form.Control name="name" className="mb-1" type="text" value={form["name"]} onChange={handleChange} />
                    </Col>
                    <Col>
                        <Form.Check name="importance" checked={form["importance"]} className="m-3" type="switch" value={1} label="Important" onChange={handleChange} isInvalid/> 
                    </Col>
                </Form.Group>
                <Form.Group className="d-flex flex-wrap mt-3 mb-3" as={Row}>
                    <Form.Label>Spoons: </Form.Label>
                    <Col>
                        <Form.Control name="spoons" className="text-center" value={form["spoons"]} onChange={handleChange} />
                    </Col>
                    <Col className="d-flex align-items-end justify-content-center mt-2">
                        <SpoonToast />    
                    </Col>
                </Form.Group>
                <Form.Label>Description: </Form.Label>
                <Form.Control name="description" className="mb-3" as="textarea" rows={4} value={form["description"]} onChange={handleChange} />
                <Form.Label>Duration: </Form.Label>
                <Container className="d-flex justify-content-center">
                    <Form.Check name="all-day" checked={allDay} className="mt-3" type="switch" value={allDay} label="All-day" onChange={handleChange} />
                </Container>
                <Form.Group as={Row} className="d-flex justify-content-around mb-3" direction="horizontal">
                    <Form.Group as={Col} className="m-3">
                        <Form.Label>Hours:</Form.Label>
                        <Form.Select name="hours" size="sm" className="m-2" disabled={disabled} value={form["hours"]} onChange={handleChange}>
                            <option>0</option>
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
                    </Form.Group>
                    <Form.Group as={Col} className="m-3">
                        <Form.Label>Minutes: </Form.Label>
                        <Form.Select name="minutes" size="sm" className="m-2" disabled={disabled} value={form["minutes"]} onChange={handleChange}>
                            <option>00</option>
                            <option>15</option>
                            <option>30</option>
                            <option>45</option>
                        </Form.Select>
                    </Form.Group>
                </Form.Group>
                <Stack className="d-flex justify-content-center mb-3">
                    <Button className="mb-3" type="submit">Submit</Button>
                    <Button variant="outline-danger" onClick={() => { history.push(`/days/${date}`); window.location.reload(false); }}>Cancel</Button>
                </Stack>
            </Form>
        </Container>
    );
}

export default EventForm;