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
            const compare = (day1, day2) => {
                let formatedDate1 = day1.date
                    formatedDate1 = formatedDate1.split("");
                    formatedDate1.splice(10);
                    formatedDate1 = formatedDate1.join("");
                let formatedDate2 = day2.date
                    formatedDate2 = formatedDate2.split("");
                    formatedDate2.splice(10);
                    formatedDate2 = formatedDate2.join("");
                if(formatedDate1 < formatedDate2) return -1;
                if(formatedDate1 > formatedDate2) return 1;
                if(formatedDate1 === formatedDate2) return 0;
            }
            setDays(user.days.sort(compare));
        }
    }, [mode, user.days]);

    const daysListed = days.map((day, key) => <Day key={key} d={day.date} user={user} />);

    return (
        <Container>
            <ViewDropdown setSettings={setSettings} />
            {daysListed}
        </Container>
    );
}

export default Schedule;