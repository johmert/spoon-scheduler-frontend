import React from "react";
import { Route, Switch } from "react-router-dom";
import UserForm from "./UserForm";

function Home() {

    return (
        <div>
            <p className="h3">This is the home page</p>
        </div>
    )

    /*
    return (
        <div>
            <Switch>
                <Route path ="/register">
                    <p className="h4">Register!</p>
                    <UserForm mode="register" />
                </Route>
                <Route path="/" exact={true}>
                    <p className="h1">This is the spoon scheduler!</p>
                    <div className="container">
                        <p className="h4">Login!</p>
                        <UserForm mode="login" />
                    </div>
                </Route>
            </Switch>
        </div>
    )
    */
}

export default Home;