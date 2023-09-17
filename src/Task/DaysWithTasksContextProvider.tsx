import {createContext, ReactNode, useCallback, useContext, useState} from 'react';

interface DaysWithTasksContextProps {
    daysList: Record<string, Array<Task>>
    addTask: (day: string, task: Task) => void
    moveTask: (to: string, taskId: string, index: number) => void
    updateTask: (task:Task) => void
    deleteTask: (task:Task) => void
    exportTasks: (day: string, tasks: Array<Task>) => void
}

const DaysTaskContext = createContext<DaysWithTasksContextProps>({
    daysList: {},
    addTask: () => {},
    moveTask: () => {},
    updateTask: () => {},
    deleteTask: () => {},
    exportTasks: () => {}
})

interface Props {
    children: ReactNode
}

const DaysTasksContextProvider = ({ children }: Props) => {

    const [daysList, setDaysList] = useState<Record<string, Array<Task>>>({
        '2023-09-23': [{id: '04504d69-996d-44df-bfe4-90b427a1cbbd', text: 'qqwdqjkhqwkodhwqkdhqwkhwe', labels: [], date: '2023-09-23', sortIndex: 0}, {id: '2f88d956-3a5e-45fd-951b-478fb914bd07', text: '23 of September', labels: [], date: '2023-09-23', sortIndex: 0}, {id: 'c7f57a8c-d0c6-4714-b85c-8ab555de7534', text: 'Task1', labels: [], date: '2023-09-23', sortIndex: 1}]
    })

    const findTaskById = useCallback((taskId: string):Task|undefined => {
        const taskList = Object.values(daysList).flat();
        return  taskList.find((item) => item.id === taskId);
    },[daysList])

    const exportTasks = useCallback((day:string, tasks: Array<Task>) => {
        setDaysList((prevState) =>({...prevState, [day]: tasks}))
    },[])

    const addTask = useCallback((day: string, task: Task) => {
        setDaysList((prevState) => {
            if(prevState[day]){
                return {...prevState, [day]: [...prevState[day], task]};
            }
            return {...prevState, [day]: [task]};
        })
    },[]);

    const moveTask = (to: string, taskId: string, index: number) => {
        setDaysList((prevState) => {
            const task = findTaskById(taskId);
            if(task){
                const fromTaskList = prevState[task.date];
                const fromTaskListElementIndex = fromTaskList.indexOf(task);
                fromTaskList.splice(fromTaskListElementIndex, 1);
                const toTaskList = prevState[to] || [];
                toTaskList.splice(index, 0, {...task, date: to});
                return {...prevState, [task.date]: fromTaskList, [to]: toTaskList};
            }

            return prevState
        })
    }

    const updateTask = useCallback((task: Task) => {
        setDaysList((prevState) => ({...prevState, [task.date]: prevState[task.date].map((item) => item.id === task.id ? task : item)}))
    },[]);

    const deleteTask = useCallback((task:Task) => {
        setDaysList((prevState) => {
            const dateTaskList = prevState[task.date];
            const dateTaskListElementIndex = dateTaskList.indexOf(task);
            dateTaskList.splice(dateTaskListElementIndex, 1);
            return {...prevState, [task.date]: dateTaskList};
        })
    },[]);

    return (
        <DaysTaskContext.Provider value={{daysList, addTask, moveTask, updateTask, deleteTask, exportTasks}}>
            {children}
        </DaysTaskContext.Provider>
    );
}

const useDaysTaskContext = () => {
    const context = useContext(DaysTaskContext);

    if (context === undefined) {
        throw new Error('useDateTaskContext must be used within a DaysWithTasksContextProvider');
    }

    return context;

}
export { DaysTasksContextProvider, useDaysTaskContext };