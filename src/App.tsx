import './App.css'
import Calendar from "./Calendar.tsx";
import dayjs from "dayjs";
import {months, yearsArray} from "./utils.ts";
import {useState} from "react";
import {LabelContextProvider} from "./Labels/LabelContextProvider.tsx";
import ManageLabelModal from "./Labels/ManageLabelModal.tsx";
import {FilterContextProvider} from "./Filters/FiltersContextProvider.tsx";
import TextFilter from "./Filters/TextFilter.tsx";
import LabelFilter from "./Filters/LabelFilter.tsx";
import ExportToFile from "./ExportToFile.tsx";
import {DaysTasksContextProvider} from "./Task/DaysWithTasksContextProvider.tsx";
import ImportFromFile from "./ImportFromFile.tsx";
import ImportToImage from "./ImportToImage.tsx";

function App() {
    const [currentDate, setCurrentDate] = useState(dayjs());

    console.log(currentDate)

  return (
      <DaysTasksContextProvider>
    <LabelContextProvider>
        <FilterContextProvider>
        <button onClick={() => {setCurrentDate((prev) => prev.subtract(1, 'month'))}}>{'<'}</button>
        <button onClick={() => {setCurrentDate((prev) => prev.add(1, 'month'))}}>{'>'}</button>
        <select onChange={(event) => {
            console.log(event.target.value)
            setCurrentDate((prev) => prev.set('month', Number(event.target.value)))
        }}>
            {months.map((month) => <option key={month.label} selected={currentDate.month() === month.value} value={month.value}>{month.label}</option>)}
        </select>

        <select onChange={(event) => {
            setCurrentDate((prev) => prev.set('year', Number(event.target.value)))
        }}>
            {yearsArray.map((year) => <option key={year} selected={currentDate.year() === year} value={year}>{year}</option>)}
        </select>
        <ManageLabelModal />
            <TextFilter />
            <LabelFilter />
            <ExportToFile selectedYear={currentDate.year()} selectedMonth={currentDate.month()} />
            <ImportFromFile />
            <ImportToImage />
        <Calendar calendarType="month" selectedYear={currentDate.year()} selectedMonth={currentDate.month()} />
        </FilterContextProvider>
    </LabelContextProvider>
      </DaysTasksContextProvider>
  )
}

export default App
