import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Stack from "react-bootstrap/Stack";

function ViewDropdown({setSettings}) {
    return (
        <Navbar collapseOnSelect expand="sm" variant="dark">
            <Container className="d-flex">
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
            </Container>
        </Navbar>
    )
}

export default ViewDropdown;