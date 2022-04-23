import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import DayForm from "../Days/DayForm";
import DayView from "../Days/DayView";
import EventForm from "../Events/EventForm";
import EventView from "../Events/EventView";
import NotFound from "../../utils/NotFound";

function Day({user}) {
    const { date } = useParams();
    
    return (
        <Switch>
            <Route path={`/days/${date}/events/:eventId/edit`}>
                <EventForm mode="edit" user={user} date={date} />
            </Route>
            <Route path={`/days/${date}/events/add`}>
                <EventForm mode="create" user={user} date={date} />
            </Route>
            <Route exact path={`/days/${date}/events/:eventId`} >
                <EventView user={user} date={date} />
            </Route>
            <Route path={`/days/${date}/edit`}>
                <DayForm mode="edit" user={user} date={date} />
            </Route>
            <Route exact path={`/days/${date}`}>
                <DayView user={user} date={date} />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}

export default Day;