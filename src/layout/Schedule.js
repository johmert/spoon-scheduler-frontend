import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import DayPreview from "./Days/DayPreview";
import ViewDropdown from "../utils/ViewDropdown";

function Schedule({days, mode, setSettings}) {

    useEffect(() => {
        if(days){
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
            days.sort(compare);
        }
    }, [mode, days]);

    const daysListed = days.map((day, key) => <DayPreview key={key} day={day} />);

    return (
        <Container>
            <ViewDropdown setSettings={setSettings} />
            {daysListed}
        </Container>
    );
}

export default Schedule;