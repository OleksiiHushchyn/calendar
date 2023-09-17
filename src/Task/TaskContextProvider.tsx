import {createContext, ReactNode, useContext, useState} from 'react';

interface TaskContextProps {
    taskList: Record<string, Task>;
    updateValue: (newValue: Task) => void;
    deleteValue: (taskId: string) => void
}
const DateTaskContext = createContext<TaskContextProps>({
    taskList: {},
    updateValue: () => {},
    deleteValue: () => {}
});

interface Props {
    children: ReactNode
}
const TaskContextProvider = ({ children }: Props) => {
    const [taskList, setTaskList] = useState({
        '04504d69-996d-44df-bfe4-90b427a1cbbd': {id: '04504d69-996d-44df-bfe4-90b427a1cbbd', text: 'qwe', labels: [], date: '2023-09-12', sortIndex: 0},
        '2f88d956-3a5e-45fd-951b-478fb914bd07': {id: '2f88d956-3a5e-45fd-951b-478fb914bd07', text: '23 of September', labels: [], date: '2023-09-23', sortIndex: 0},
        'c7f57a8c-d0c6-4714-b85c-8ab555de7534': {id: 'c7f57a8c-d0c6-4714-b85c-8ab555de7534', text: 'Task1', labels: [], date: '2023-09-23', sortIndex: 1},
        '67e26376-2169-4af7-b057-385abea5fc22': {id: '67e26376-2169-4af7-b057-385abea5fc22', text: 'Task2', labels: [], date: '2023-09-23', sortIndex: 2},
        '1d422577-3d7b-44ea-a0e1-073ca3fa82c5': {id: '1d422577-3d7b-44ea-a0e1-073ca3fa82c5', text: 'Task3', labels: [], date: '2023-09-23', sortIndex: 3},
        'af0bb36e-5eb9-4fb5-aad5-bf19f0fc5fea': {id: 'af0bb36e-5eb9-4fb5-aad5-bf19f0fc5fea', text: 'Task4', labels: [], date: '2023-09-23', sortIndex: 4},
        'ea4fc6a6-c13a-4cde-a838-a2df5e9536b6': {id: 'ea4fc6a6-c13a-4cde-a838-a2df5e9536b6', text: 'Task5', labels: [], date: '2023-09-23', sortIndex: 5},
    });

    const updateValue = (value: Task) => {
        setTaskList((prevState) => ({...prevState, [value.id]: value}))
    }

    const deleteValue = (taskId: string) => {
        console.log(taskId)
        //TOdo fix it
        //setTaskList((prevState) => ({taskId, ...prevState}))
    }

    return (
        <DateTaskContext.Provider value={{taskList, updateValue, deleteValue}}>
            {children}
        </DateTaskContext.Provider>
    );
}

const useTaskContext = () => {
    const context = useContext(DateTaskContext);

    if (context === undefined) {
        throw new Error('useDateTaskContext must be used within a TaskContextProvider');
    }

    return context;

}
export { TaskContextProvider, useTaskContext };