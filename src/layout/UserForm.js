import React, { useEffect, useState } from "react";
import { createUser, loginUser } from "../utils/api/index"
import Button from "react-bootstrap/Button"

function UserForm({setToken}) {
    const [mode, setMode] = useState("login");
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const abortController = new AbortController();
    const label = mode === "login" ? "Login" : "Register";

    const loginForm = (
        <div>
            <Button className="primary" type="submit">Submit</Button>
            <span className="mx-3">Not a user? </span>
            <Button className="outline-primary" onClick={clickRegister}>Register Now!</Button>        
        </div>
    );

    const registerForm = (<>
        <label>
            <p>Confirm Password: </p>
            <input type="password" onChange={e => setConfirmPassword(e.target.value)} />                
        </label>
        <div>
            <Button className="primary" type="submit">Submit</Button>
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
        <div>
            <span className="h1">Please {label}</span>
            <form className="container" onSubmit={handleSubmit}>
                <label>
                    <p>Username: </p>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                </label>                
                <label>
                    <p>Password: </p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                {form}
            </form>
        </div>
    )
}

export default UserForm;