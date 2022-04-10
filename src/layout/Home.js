import React from "react";
import { Route, Switch } from "react-router-dom";

function Home() {
    return (
        <div>
            <Switch>
                <Route path ="/register">
                    <p className="h4">Register!</p>
                </Route>
                <Route path="/" exact={true}>
                    <p className="h1">This is the spoon scheduler!</p>
                    <div className="container">
                        <p className="h4">Login!</p>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default Home;