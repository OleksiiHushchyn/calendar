import styled from "styled-components";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import Day from "./Day.tsx";

interface Props {
    calendarType: 'week' | 'month'
    selectedYear: number
    selectedMonth: number
    weekNumber?: number
}

const CalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 1fr repeat(6, 2fr);
    grid-column-gap: 5px;
    grid-row-gap: 5px;
`

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Calendar = ({calendarType, selectedYear, selectedMonth}: Props) => {
    const [dates, setDates] = useState<Array<DayWithTasks>>([])

    useEffect(() => {
        const date = dayjs(`${selectedYear}-${selectedMonth++}`);
        const firstDayOfMonth = date.startOf('month').day();
        const lastDayOfMonth = date.endOf('month').day();

        const startDay = date.startOf('month').subtract(firstDayOfMonth, 'day');
        const lastDay  = date.endOf('month').add(6 - lastDayOfMonth, 'day');

        let current = startDay;
        const result:Array<DayWithTasks> = [];
        do {
            let dayFormat = 'D'
            if(current.isSame(current.startOf('month'), 'day') || current.isSame(current.endOf('month'), 'day')){
                dayFormat = 'MMM D'
            }
            result.push({formattedValue: current.format('YYYY-MM-DD'), formattedDayValue: current.format(dayFormat), tasks: []})
            current = current.add(1, 'day');
        }while (!current.isAfter(lastDay, 'day'))
        setDates(result)
    },[selectedYear, selectedMonth])

    return (
        <>
            <CalendarContainer>
                {days.map((dayName) => (<div key={dayName}>{dayName}</div>))}
                {dates.map((item) => (<Day key={item.formattedValue} value={item} />))}
                <div>{calendarType}</div>
            </CalendarContainer>
        </>
    )
}

export default Calendar;