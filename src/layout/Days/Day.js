import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import DayForm from "../Days/DayForm";
import DayView from "../Days/DayView";
import EventForm from "../Events/EventForm";
import EventView from "../Events/EventView";
import NotFound from "../../utils/NotFound";

function Day({ days, user }) {
    const { date } = useParams();

    return (
        <Switch>
            <Route path={`/days/${date}/events/:eventId/edit`}>
                <EventForm 
                    mode="edit" 
                    user_id={user.user_id} 
                    date={date} 
                    days={days} 
                />
            </Route>
            <Route path={`/days/${date}/events/add`}>
                <EventForm 
                    mode="create" 
                    user_id={user.user_id} 
                    date={date} 
                    days={days}
                />
            </Route>
            <Route exact path={`/days/${date}/events/:eventId`} >
                <EventView user_id={user.user_id} d={date} />
            </Route>
            <Route path={`/days/${date}/edit`}>
                <DayForm mode="edit" user={user} date={date} />
            </Route>
            <Route exact path={`/days/${date}`}>
                <DayView 
                    d={date} 
                    days={days} 
                    user_id={user.user_id} 
                />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}

export default Day;