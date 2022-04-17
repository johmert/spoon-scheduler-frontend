import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

function SpoonToast({spoons}) {
    const [showSpoonHint, setShowSpoonHint] = useState(false);
    const toggleShowSpoonHint = () => setShowSpoonHint(!showSpoonHint);
    const label = spoons > 0 ? "your past events" : "our suggestions" 

    return (
        <Row>
            <Col>
                <Button variant="outline-primary" onClick={toggleShowSpoonHint}>Spoons?</Button>
                <Toast show={showSpoonHint} onClose={toggleShowSpoonHint}>
                    <Toast.Header>
                        <strong className="me-auto">Here's some tips </strong>
                        <small>from {label}</small>
                    </Toast.Header>
                    <Toast.Body>
                        <ol>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ol>
                    </Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}

export default SpoonToast;