import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createDay, readDay, updateDay } from "../../utils/api";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

function DayForm({mode, user_id, date}) {
    const initialStateDay = {
        date: '',
        day_left: 0,
        events: [],
        max_spoons: 0,
        user_id: user_id
    };
    const [day, setDay] = useState(initialStateDay);
    const [form, setForm] = useState({ date: '', max_spoons: 0 });
    const [formatedDate, setFormatedDate] = useState('');
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        let formDate = date;
        if( date ) { 
            formDate = formDate.split("");
            formDate.splice(10);
            formDate = formDate.join("");
            setFormatedDate(formDate);
        }
        async function getDay() {
            if(mode === "create") return;
            try {
                const response = await readDay(formDate, user_id, abortController.signal);
                if(response) {
                    setDay({ ...response, date: formDate });
                    setForm({ ...response, date: formDate });
                }
                
            } catch(error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        getDay();
        return () => {
            abortController.abort();
        }
        
    }, [date, formatedDate, mode, user_id]);

    async function handleSubmit(e) {
        const abortController2 = new AbortController();
        e.preventDefault();
        let newDay = {
            date: form.date,
            events: day.events,
            max_spoons: form.max_spoons,
            user_id: day.user_id
        }
        if(mode === 'edit') {
            try {
                await updateDay(newDay, user_id, abortController2.signal);
            } catch(error) {
                console.log(error.status)
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
            history.push("/");
            window.location.reload(false);
        } else if(mode === 'create') {
            try {
                await createDay(newDay, user_id, abortController2.signal);
            } catch(error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
            history.push("/");
            window.location.reload(false);
        }
    }

    return (
        <Container>
            <p className="h4 m-3 text-center">{mode.charAt(0).toUpperCase() + mode.slice(1) + " Day"}</p>
            <Form onSubmit={handleSubmit}>
                <Stack>
                    <Form.Label className="d-flex align-self-center">Date: </Form.Label>
                    <Form.Control
                        name="date"
                        value={form["date"]} 
                        className="d-flex text-center mb-2" 
                        type="date" 
                        onChange={e => setForm({...form, date: e.target.value})}
                        disabled={mode === "edit"} />
                    <Form.Label className="d-flex align-self-center">Max Spoons: </Form.Label>
                    <Form.Control 
                        name="max_spoons"
                        value={form["max_spoons"]} 
                        className="d-flex text-center mb-2" 
                        onChange={e => setForm({...form, max_spoons: e.target.value})} />
                    <Button 
                        className="mb-2" 
                        type="submit" 
                        variant="primary">
                        {mode.charAt(0).toUpperCase() + mode.slice(1) + " Day"}
                    </Button>
                    <Button 
                        className="mb-2" 
                        variant="outline-danger"
                        onClick={() => { history.push("/"); window.location.reload(false); }}>
                        Cancel
                    </Button>
                </Stack>
            </Form>
        </Container>
    )
}

export default DayForm;