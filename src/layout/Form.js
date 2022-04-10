import React from "react";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form";

function UserForm({mode}) {
    console.log(mode);

    return(
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Username: </Form.Label>
                <Form.Control type="username" placeholder="Enter username" />
                <Form.Text className="text-muted">Same as your email address</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" placeholder="Password"/>
            </Form.Group>

            <div className="container">
                <Button variant="primary" type="submit">Login</Button>
                <Form.Label className="ps-3 pe-2">Not a user?</Form.Label>
                <Button variant="outline-primary">Register Now!</Button>
            </div>
            
        </Form>
    )
}

export default UserForm;