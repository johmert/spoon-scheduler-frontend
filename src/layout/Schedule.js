import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Day from "./Day";

function Schedule({mode, user}) {
    const initialState = [{
        date: '',
        day_left: 0,
        events: [{}],
        max_spoons: 0,
        user_id: user.user_id
    }];
    const [days, setDays] = useState(initialState);

    useEffect(() => {
        if(user.days){
            console.log(user.days.splice(1));
            if(mode === "1-day") setDays(user.days.splice(1));
            if(mode === "3-day") setDays(user.days.splice(3));
            if(mode === "week") setDays(user.days.splice(7));
        }
    }, [mode, user.days]);

    const daysListed = days.map((day, key) => <Day key={key} d={day.date} user={user} />)
    console.log(mode);

    return (
        <Container>
            {daysListed}
        </Container>
    );
}

export default Schedule;