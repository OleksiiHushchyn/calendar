import styled from "styled-components";
import TaskComponent from "./Task/TaskComponent.tsx";
import {DragEvent, useCallback, useEffect, useState} from "react";
import ManageTask from "./Task/ManageTask.tsx";
import { v4 as uuidv4 } from 'uuid';
import {useDaysTaskContext} from "./Task/DaysWithTasksContextProvider.tsx";
import {useFilterContext} from "./Filters/FiltersContextProvider.tsx";
interface Props {
    value: DayWithTasks
    worldWideHolidayList?: Array<string>
}

const DayWrapper = styled.div<{isCurrent: boolean}>`
  border: 1px solid black;
  border-radius: 3%;
  padding: 5px;
  width: 200px;
  color: black;
  background-color: #dcd7cc;
  opacity: ${props => props.isCurrent ? '1' : '0.5'};
`
const Day = ({value, worldWideHolidayList}: Props) => {
    const {daysList, addTask, moveTask, updateTask, deleteTask} = useDaysTaskContext();
    const [showAddForm, setShowAddForm] = useState<boolean>(false)
    const {textFilter, colorFilter} = useFilterContext()

    const [tasks, setTasks] = useState<Array<Task>>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const data = daysList[value.formattedValue] || [];
        let filteredData = textFilter ? data.filter((task) => task.text.toLowerCase().startsWith(textFilter)) : data
        filteredData = colorFilter.length > 0 ? filteredData.filter((task) => colorFilter.every(label => task.labels.includes(label))) : filteredData;
        setTasks(filteredData);
    },[value, daysList, textFilter, colorFilter])

    const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        const elementId = e.dataTransfer.getData('text/plain');
        moveTask(value.formattedValue, elementId, currentIndex);
    },[value, moveTask, currentIndex])

    const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    },[])

    const handleCreateTask = useCallback((text:string) => {
        const task:Task = {
            id: uuidv4(),
            text,
            labels: [],
            date: value.formattedValue,
            sortIndex: tasks.length
        };
        addTask(value.formattedValue, task)
    },[value, tasks, addTask])

    const handleUpdateTask = useCallback((task: Task) => {
        updateTask(task)
    },[updateTask]);

    const handleDeleteTask = useCallback((task: Task) => {
        deleteTask(task)
    },[deleteTask])

    const handleClose = () => {
        setShowAddForm(false)
    }

    return (
        <>
            <DayWrapper isCurrent={value.isCurrent} onDragOver={onDragOver} onDrop={(e) => onDrop(e)}>
                <div>{value.formattedDayValue}</div>
                {worldWideHolidayList && worldWideHolidayList.map((item) => (<div>{item}</div>))}
                {showAddForm ? <ManageTask handleClose={handleClose} handleSubmit={handleCreateTask} /> : <div onClick={() => {setShowAddForm(true)}}>+</div>}
                {tasks.map((task, index) => (<TaskComponent handleDelete={handleDeleteTask} handleUpdate={handleUpdateTask} key={task.id} task={task} index={index} setCurrentIndex={setCurrentIndex} />))}
            </DayWrapper>
        </>
    )
}

export default Day;