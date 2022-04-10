import React from "react";

function Form({mode}) {
    console.log(mode);

    return(
        <div className="container">
            <p>I'm a {mode} form!</p>
        </div>
    )
}

export default Form;