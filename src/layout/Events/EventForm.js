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


function EventForm({date, mode, user}) {
    const { eventId } = useParams();
    const { user_id } = user;
    const [disabled, setDisabled] = useState(false);
    let formatedDate = date;
    if( date ) { 
        formatedDate = formatedDate.split("");
        formatedDate.splice(10);
        formatedDate = formatedDate.join("");
    }
    const initialEventState = {
        name: '',
        importance: 0,
        spoons: 0,
        description: '',
        timeDuration: 0,
        date: formatedDate,
        event_id: eventId
    }
    const [event, setEvent] = useState(initialEventState);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [spoonValue, setSpoonValue] = useState(0);
    const initialState = {
        name: '',
        importance: 0,
        spoons: 0,
        description: '',
        timeDuration: 0,
    }
    const [form, setForm] = useState({...initialState})
    const abortController = new AbortController();
    const history = useHistory();

    useEffect(() => {
        const initialFormState = {
            name: '',
            importance: 0,
            spoons: 0,
            description: '',
            timeDuration: 0,
        }
        async function getEvent() {
            if(mode === "create") return;
            try {
                const response = await readEvent(formatedDate, eventId, user_id, abortController.signal);
                setEvent({...response, date: formatedDate});
                initialFormState.name = response.name;
                initialFormState.importance = response.importance;
                initialFormState.spoons = response.spoons;
                initialFormState.description = response.description;
                initialFormState.timeDuration = response.timeDuration;
                setForm({...initialFormState});
            } catch (error) {
                if(error.name !== "AbortController") throw error;
            }
        }
        getEvent();
        return () => {
            abortController.abort();
        }
        // eslint-disable-next-line
    }, [form, formatedDate, eventId, mode, user_id]);

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
                setSpoonValue(spValue);
                setForm({...form, spoons: spValue }); 
                break;
            case "description":
                setForm({...form, description: target.value }); 
                break;
            case "all-day":
                setDisabled(!disabled);
                const tdValue = target.checked ? 1440 : hours+minutes;
                setForm({...form, timeDuration: tdValue }); 
                break;
            case "hours":
                const hrValue = parseInt(target.value) * 60;
                setHours(hrValue);
                setForm({...form, timeDuration: hrValue+minutes }); 
                break;
            case "minutes":
                const minValue = parseInt(target.value);
                setMinutes(minValue);
                setForm({...form, timeDuration: hours+minValue });
                break;
            default:
                console.log("something went wrong!")
                break;
        }
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        let newEvent = {
            name: form.name,
            importance: form.importance,
            spoons: form.spoons,
            description: form.description,
            timeDuration: form.timeDuration,
            date: formatedDate
        }
        if(mode === "create") {
            try {
                await createEvent(newEvent, user_id, abortController.signal);
            } catch(error) {
                if(error.name !== "AbortError") throw error;
            }
            history.push(`/days/${date}/`);
            window.location.reload(false);
        } else if(mode === "update") {

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
                        <Form.Check name="importance" checked={form.importance} className="m-3" type="switch" value={1} label="Important" onChange={handleChange} isInvalid/> 
                    </Col>
                </Form.Group>
                <Form.Group className="d-flex flex-wrap mt-3 mb-3" as={Row}>
                    <Form.Label>Spoons: </Form.Label>
                    <Col>
                        <Form.Control name="spoons" className="text-center" value={spoonValue} onChange={handleChange} />
                    </Col>
                    <Col className="d-flex align-items-end justify-content-center mt-2">
                        <SpoonToast />    
                    </Col>
                </Form.Group>
                <Form.Label>Description: </Form.Label>
                <Form.Control name="description" className="mb-3" as="textarea" rows={4} onChange={handleChange} />
                <Form.Label>Duration: </Form.Label>
                <Form.Check name="all-day" className="mb-3" type="switch" value={1440} label="All-day" onChange={handleChange} />
                <Stack className="mb-3" direction="horizontal">
                    <Form.Select name="hours" size="sm" className="m-2" disabled={disabled} onChange={handleChange}>
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
                    <Form.Select name="minutes" size="sm" className="m-2" disabled={disabled} onChange={handleChange}>
                        <option className="text-center">Minutes</option>
                        <option>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                    </Form.Select>
                </Stack>
                <Stack className="d-flex justify-content-center mb-3">
                    <Button className="mb-3" type="submit">Submit</Button>
                    <Button variant="outline-danger" onClick={() => { history.push(`/days/${date}`); window.location.reload(false); }}>Cancel</Button>
                </Stack>
            </Form>
        </Container>
    );
}

export default EventForm;