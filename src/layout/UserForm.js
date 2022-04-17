import React, { useEffect, useState } from "react";
import { createUser, loginUser } from "../utils/api/index"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Stack from "react-bootstrap/Stack"

function UserForm({setToken}) {
    const [form, setForm] = useState();
    const [mode, setMode] = useState("login");
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const abortController = new AbortController();
    const label = mode === "login" ? "Login" : "Register";

    useEffect(() => {
        
        const loginForm = (
            <Stack className="d-flex justify-content-center">
                <Button className="mb-3" variant="primary" type="submit">Submit</Button>
                <p className="my-2 align-self-center">Not a user? </p>
                <Button variant="outline-primary" onClick={clickRegister}>Register Now!</Button> 
            </Stack>
        );

        const registerForm = (<>
            <Form.Label>Confirm Password: </Form.Label>
            <Form.Control className="mb-3" type="password" onChange={e => setConfirmPassword(e.target.value)} />                
            <Stack className="d-flex justify-content-center">
                <Button className="mb-3" variant="primary" type="submit">Submit</Button>
                <Button variant="outline-primary" onClick={()=> window.location.reload(false)}>Cancel</Button>
            </Stack>
        </>);


        if(mode === "login") {
            setForm(loginForm);
        } else if (mode === "register") {
            setForm(registerForm)
        }
        return () => {
            abortController.abort();
        };
        // eslint-disable-next-line
    }, [mode]);

    function clickRegister(){
        setMode("register")
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const credentials = { username: username, password: password}
        let user;
        if(mode === "login") {
            user = await loginUser(credentials, abortController.signal);
            setToken(user);
        } else if(mode === "register") {
            if(confirmPassword === password){
                await createUser(credentials, abortController.signal);
                user = await loginUser(credentials, abortController.signal);
                setToken(user);
            } else {
                alert("Passwords must match!");
            }
        }
    }

    return(
        <Container>
            <h1 className="text-center">Please {label}</h1>
            <Form className="container" onSubmit={handleSubmit}>
                <Form.Label>Username: </Form.Label>
                <Form.Control className="mb-3" type="text" onChange={e => setUsername(e.target.value)} />                
                <Form.Label>Password: </Form.Label>
                <Form.Control className="mb-3" type="password" onChange={e => setPassword(e.target.value)} />
                {form}
            </Form>
        </Container>
    )
}

export default UserForm;