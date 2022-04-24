import React from "react";
import Container from "react-bootstrap/Container";

function Splash() {
    return (
        <Container className="m-4">                
            <p className="h1 m-3 text-center">Spoon Scheduler</p>
            <p className="h5 text-center">Spoons represent our mental capacity.</p>
            <p className="text-center">Want to learn more? <a href="https://en.wikipedia.org/wiki/Spoon_theory">Click here</a></p>
        </Container>
    );
}

export default Splash;