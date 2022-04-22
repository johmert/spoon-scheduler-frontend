import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation({setToken}) {
    const history = useHistory();

    return (<>
    <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
                <Container className="d-flex justify-content-center">
                    <Navbar.Brand href="/">Spoon Scheduler</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className= "me-auto">
                            <Button className="m-2" variant="primary" onClick={() => { history.push("/addDay"); window.location.reload(false); }}> + Add New Day</Button>
                            <Button className="m-2" variant="danger" onClick={() => setToken('')}>Log Out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    </>);
}

export default Navigation;