import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation({setToken}) {
    const history = useHistory();
    const homeButton = (
    <>
        <style type="text/css">
            {`
                .btn-xxl {
                    padding: 1rem 1.5rem;
                    font-size: 1.5rem;
                }
    `       }
        </style>
        <Button 
            className="d-flex align-items-center justify-content-center" 
            onClick={() => { history.push("/"); window.location.reload(false); }}
            size="xxl">
            Spoon Scheduler
        </Button>
    </>
    );

    return (<>
        <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
            <Container className="d-flex justify-content-center">
                {homeButton}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className= "me-auto">
                            <Button className="m-2" variant="primary" onClick={() => { history.push("/days/add"); window.location.reload(false); }}> + Add New Day</Button>
                            <Button className="m-2" variant="danger" onClick={() => setToken('')}>Log Out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    </>);
}

export default Navigation;