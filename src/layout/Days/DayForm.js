import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createDay, readDay, updateDay } from "../../utils/api";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

function DayForm({mode, user}) {
    const initialState = {
        date: '',
        day_left: 1440,
        max_spoons: (user.avg_spoons * 2),
        user_id: user.user_id
    };
    const [day, setDay] = useState(initialState);
    const [form, setForm] = useState();
    const [spoonValue, setSpoonValue] = useState(user.avg_spoons * 2);
    const abortController = new AbortController();
    const { date } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function getDay() {
            if(mode === "create") return;
            try {
                const response = await readDay(date, user.user_id, abortController.signal);
                setDay(response);
                setForm({
                    date: day.date,
                    max_spoons: day.max_spoons
                })
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
    }, [date, mode, user.user_id]);

    async function handleSubmit(e) {
        e.preventDefault();
        const newDay = {
            date: form.date,
            day_left: day.day_left,
            max_spoons: form.max_spoons,
            user_id: day.user_id
        }
        if(mode === 'edit') {
            try {
                await updateDay(newDay, user.user_id, abortController.signal);
            } catch(error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
            history.push("/");
            window.location.reload(false);
        } else if(mode === 'create') {
            try {
                await createDay(newDay, user.user_id, abortController.signal);
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
            <Form onSubmit={handleSubmit}>
                <Stack>
                    <Form.Label className="d-flex align-self-center">Date: </Form.Label>
                    <Form.Control className="d-flex text-center mb-2" type="date" onChange={e => setForm({...form, date: e.target.value})} />
                    <Form.Label className="d-flex align-self-center">Max Spoons: </Form.Label>
                    <Form.Control value={spoonValue} className="d-flex text-center mb-2" onChange={e => {setForm({...form, max_spoons: e.target.value}); setSpoonValue(e.target.value)} } />
                    <Button className="mb-2" type="submit" variant="primary">Add Day</Button>
                    <Button className="mb-2" variant="outline-primary">Cancel</Button>
                </Stack>
            </Form>
        </Container>
    )
}

export default DayForm;