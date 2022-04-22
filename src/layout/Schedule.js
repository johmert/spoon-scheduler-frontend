import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Day from "./Days/Day";
import ViewDropdown from "../utils/ViewDropdown";

function Schedule({mode, user, setSettings}) {
    const initialState = [{
        date: '2022-01-01',
        day_left: 0,
        events: [],
        max_spoons: 0,
        user_id: user.user_id
    }];
    const [days, setDays] = useState(initialState);

    useEffect(() => {
        if(user.days){
            setDays(user.days.sort())
        }
    }, [mode, user.days]);

    const daysListed = days.map((day, key) => <Day key={key} d={day.date} user={user} />)
    console.log(mode);

    return (
        <Container>
            <ViewDropdown setSettings={setSettings} />
            {daysListed}
        </Container>
    );
}

export default Schedule;