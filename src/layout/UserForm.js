import React, { useEffect, useState } from "react";
import { createUser, loginUser } from "../utils/api/index"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"

function UserForm({setToken}) {
    const [mode, setMode] = useState("login");
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const abortController = new AbortController();
    const label = mode === "login" ? "Login" : "Register";

    const loginForm = (
        <div>
            <Button variant="primary" type="submit">Submit</Button>
            <span className="mx-3">Not a user? </span>
            <Button variant="outline-primary" onClick={clickRegister}>Register Now!</Button>        
        </div>
    );

    const registerForm = (<>
        <Form.Label>Confirm Password: </Form.Label>
        <Form.Control className="mb-3" type="password" onChange={e => setConfirmPassword(e.target.value)} />                
        <div>
            <Button variant="primary" type="submit">Submit</Button>
            <Button variant="outline-primary" onClick={()=> window.location.reload(false)}>Cancel</Button>
        </div>
    </>);

    const [form, setForm] = useState(loginForm);


    useEffect(() => {
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
            <span className="h1">Please {label}</span>
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