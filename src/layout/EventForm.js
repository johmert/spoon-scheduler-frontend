import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import SpoonToast from "./SpoonToast";

function EventForm({mode}) {
    const initialState = {
        name: '',
        description: '',
        spoons: 0,
        timeDuration: 0,
        importance: 0,
        date: '',
    }

    const [event, setEvent] = useState(initialState);
    const [form, setForm] = useState();
    const [spoonValue, setSpoonValue] = useState(0);
    const abortController = new AbortController();
    const history = useHistory();

    useEffect(() => {
        const editForm = (<><p>edit</p></>);
        const createForm = (<><p>create</p></>);

        if(mode === "edit") {
            setForm(editForm);
        } else if (mode === "create") {
            setForm(createForm);
        }
        return () => {
            abortController.abort();
        };
        // eslint-disable-next-line
    }, [mode]);

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <Container>
            <h1 className="text-center">{mode.charAt(0).toUpperCase() + mode.slice(1)}{" Event"}</h1>
            <Form className="container" onSubmit={handleSubmit}>
                <Form.Label>Event Name: </Form.Label>
                <Form.Control className="mb-3" type="text" onChange={e => setForm({...form, name: e.target.value})} />
                <div className="d-flex justify-content-between">
                    <SpoonToast />
                    <Form.Check className="mb-3" type="switch" label="Important" onChange={e => setForm({...form, importance: e.target.value})} /> 
                </div>
                <Form.Label>Spoons: </Form.Label>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Range max={10} value={spoonValue} onChange={e => setSpoonValue(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Control value={spoonValue} onChange={e => setSpoonValue(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Label>Description: </Form.Label>
                <Form.Control className="mb-3" as="textarea" rows={4} onChange={e => setForm({...form, description: e.target.value})} />
                <Form.Label>Date:</Form.Label>
                <Form.Control className="mb-3" type="date" onChange={e => setForm({...form, date: e.target.value})} />
                <Form.Label>Duration: </Form.Label>
                <Stack className="mb-3" direction="horizontal">
                    <Form.Select size="sm" className="m-1" >
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
                    <Form.Select size="sm" className="m-1" >
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