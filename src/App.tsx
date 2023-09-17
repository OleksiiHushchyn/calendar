import './App.css'
import 'papercss'
import Calendar from "./Calendar/Calendar.tsx";
import dayjs from "dayjs";
import {useState} from "react";
import {LabelContextProvider} from "./Components/Labels/LabelContextProvider.tsx";
import {FilterContextProvider} from "./Components/Filters/FiltersContextProvider.tsx";

import {DaysTasksContextProvider} from "./Task/DaysWithTasksContextProvider.tsx";

import Header from "./Components/Header.tsx";

function App() {
    const [currentDate, setCurrentDate] = useState(dayjs());

  return (
      <DaysTasksContextProvider>
        <LabelContextProvider>
            <FilterContextProvider>
                <Header setCurrentDate={setCurrentDate} currentDate={currentDate}/>
                <Calendar calendarType="month" selectedYear={currentDate.year()} selectedMonth={currentDate.month()} />
            </FilterContextProvider>
        </LabelContextProvider>
      </DaysTasksContextProvider>
  )
}

export default App
