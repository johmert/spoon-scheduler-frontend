import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

function SpoonToast() {
    const [showSpoonHint, setShowSpoonHint] = useState(false);
    const toggleShowSpoonHint = () => setShowSpoonHint(!showSpoonHint);

    return (
        <Row>
            <Col>
                <Button variant="outline-primary" onClick={toggleShowSpoonHint}>Spoons?</Button>
                <Toast show={showSpoonHint} onClose={toggleShowSpoonHint}>
                    <Toast.Header>
                        <strong className="me-auto">Here's some tips </strong>
                        <small>from our suggestions</small>
                    </Toast.Header>
                    <Toast.Body>
                        <p><strong>1 spoon</strong> Brushing Teeth</p>
                        <p><strong>5 spoons</strong> Average Work Day</p>
                        <p><strong>8 spoons</strong> Take a difficult test</p>
                        <p><strong>10 spoons</strong> Help a friend move</p>
                        <a href="https://en.wikipedia.org/wiki/Spoon_theory" rel="noreferrer" target="_blank">
                            Read about Spoon Theory
                        </a>
                    </Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}

export default SpoonToast;