import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form";
import { createUser, loginUser } from "../utils/api/index"

function UserForm({mode, setToken}) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        const credentials = { username: username, password: password}
        const user = await loginUser(credentials);
        console.log(user);
        setToken(user);
    }

    return(
        <div>
            <span className="h1">Please Log In</span>
            <form className="container" onSubmit={handleSubmit}>
                <label>
                    <p>Username: </p>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Password: </p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <Button className="primary" type="submit">Submit</Button>
                    <span className="mx-3">Not a user? </span>
                    <Button className="outline-primary" onClick={() => history.push("/register")}>Register Now!</Button>
                </div>
            </form>
        </div>
    )
}

export default UserForm;