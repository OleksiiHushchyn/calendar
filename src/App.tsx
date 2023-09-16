import './App.css'
import Calendar from "./Calendar.tsx";
import dayjs from "dayjs";
import {months, yearsArray} from "./utils.ts";
import {useState} from "react";

function App() {
    const [currentDate, setCurrentDate] = useState(dayjs());

  return (
    <>
        <button onClick={() => {setCurrentDate((prev) => prev.subtract(1, 'month'))}}>{'<'}</button>
        <button onClick={() => {setCurrentDate((prev) => prev.add(1, 'month'))}}>{'>'}</button>
        <select onChange={(event) => {
            setCurrentDate((prev) => prev.set('month', Number(event.target.value)))
        }}>
            {months.map((month) => <option key={month.label} selected={currentDate.month() === month.value} value={month.value}>{month.label}</option>)}
        </select>

        <select onChange={(event) => {
            setCurrentDate((prev) => prev.set('year', Number(event.target.value)))
        }}>
            {yearsArray.map((year) => <option key={year} selected={currentDate.year() === year} value={year}>{year}</option>)}
        </select>
        <Calendar calendarType="month" selectedYear={currentDate.year()} selectedMonth={currentDate.month()} />
    </>
  )
}

export default App
