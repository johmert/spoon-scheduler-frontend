import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createDay, readDay, updateDay } from "../../utils/api";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

function DayForm({mode, user, date}) {
    const { avg_spoons, user_id } = user;
    let formatedDate = date;
    if( date ) { 
        formatedDate = formatedDate.split("");
        formatedDate.splice(10);
        formatedDate = formatedDate.join("");
    }
    
    const initialStateDay = {
        date: '',
        day_left: 0,
        events: [],
        max_spoons: 0,
        user_id: user_id
    };
    const [day, setDay] = useState(initialStateDay);
    const [form, setForm] = useState({ date: '', max_spoons: avg_spoons *2 });
    const abortController = new AbortController();
    const history = useHistory();

    useEffect(() => {
        const initialState = {
            date: '',
            max_spoons: avg_spoons * 2,
        };
        async function getDay() {
            if(mode === "create") return;
            try {
                const response = await readDay(formatedDate, user_id, abortController.signal);
                setDay({...response, date: formatedDate });
                initialState.date = formatedDate;                    
                initialState.max_spoons = response.max_spoons;
                setForm({...initialState});
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
        // eslint-disable-next-line
    }, [avg_spoons, formatedDate, mode, user_id]);

    async function handleSubmit(e) {
        e.preventDefault();
        let newDay = {
            date: form.date,
            day_left: day.day_left,
            events: day.events,
            max_spoons: form.max_spoons,
            user_id: day.user_id
        }
        if(mode === 'edit') {
            try {
                await updateDay(newDay, user_id, abortController.signal);
            } catch(error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
            history.push("/");
            window.location.reload(false);
        } else if(mode === 'create') {
            try {
                await createDay(newDay, user_id, abortController.signal);
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