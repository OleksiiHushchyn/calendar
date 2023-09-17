import styled from "styled-components";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import Day from "./Day.tsx";
import useGetWorldWideHolidays from "./api/useGetWorldWideHolidays.tsx";

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

    const [worldWideHolidays] = useGetWorldWideHolidays();

    useEffect(() => {
        const date = dayjs(`${selectedYear}-${Number(selectedMonth + 1)}`);

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
            result.push({formattedValue: current.format('YYYY-MM-DD'), isCurrent: current.isSame(date, 'month'), formattedDayValue: current.format(dayFormat), tasks: []})
            current = current.add(1, 'day');
        }while (!current.isAfter(lastDay, 'day'))
        setDates(result)
    },[selectedYear, selectedMonth])

    return (

                    <CalendarContainer id="calendar">
                        {days.map((dayName) => (<div key={dayName}>{dayName}</div>))}
                        {dates.map((item) => (<Day worldWideHolidayList={worldWideHolidays[item.formattedValue]} key={item.formattedValue} value={item} />))}
                    </CalendarContainer>
    )
}

export default Calendar;