import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Stack from "react-bootstrap/Stack";

function Navigation({setSettings}) {
    return (<>
    <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
                <Container className="d-flex justify-content-center">
                    <Navbar.Brand href="/">Spoon Scheduler</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className= "me-auto">
                            <NavDropdown title="View" id="view-dropdown" >
                                <NavDropdown.Item>
                                    <Stack>
                                        <Button 
                                            className="d-flex justify-content-center mb-2" 
                                            variant="outline-primary"
                                            onClick={() => setSettings('1-day')}>1-day</Button>
                                        <Button 
                                            className="d-flex justify-content-center mb-2" 
                                            variant="outline-primary"
                                            onClick={() => setSettings('3-day')}>3-day</Button>
                                        <Button 
                                            className="d-flex justify-content-center mb-2" 
                                            variant="outline-primary"
                                            onClick={() => setSettings('week')}>Week</Button>
                                        <Button 
                                            className="d-flex justify-content-center" 
                                            variant="outline-primary"
                                            onClick={() => setSettings('month')}>Month</Button>
                                    </Stack>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="addDay"> + Add New Day</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    </>);
}

export default Navigation;