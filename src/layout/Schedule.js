import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import DayPreview from "./Days/DayPreview";

function Schedule({days, mode, setSettings}) {
    const [dayArray, setDayArray] = useState([]);

    useEffect(() => {
        if(days){
            setDayArray([...days]);
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
            dayArray.sort(compare);
        }
    }, [dayArray, days, mode]);

    const daysListed = dayArray.map((day, index) => <DayPreview key={index} day={day} />);
    const addLink = 
        <>
        <p className="h3 text-center">Oops! Looks like there's nothing here!</p>
        <p className="display-4 text-center">
            <a href="/days/add">Get Started - Add a Day</a>
        </p>
        </>
    const addDayPrompt = dayArray.length === 0 ? addLink : '';
    return (
        <Container className="mt-2">
            <p className="h3 m-3 text-center">Schedule Overview: </p>
            {daysListed}
            {addDayPrompt}
        </Container>
    );
}

export default Schedule;