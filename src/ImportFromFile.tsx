import {ChangeEvent, useCallback} from "react";
import {useDaysTaskContext} from "./Task/DaysWithTasksContextProvider.tsx";
import dayjs from "dayjs";

const ImportFromFile = () => {
    const {exportTasks} = useDaysTaskContext();


    const selectFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        try{
            if(e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0]
                const data = await new Response(file).json();

                for (const date in data){
                    if(dayjs(date).isValid()){
                        if(data[date] && data[date].length > 0) {
                            exportTasks(date, data[date])
                        }
                    }
                }
            }
        }catch (e){
            console.error(e)
        }
    },[exportTasks])

    return (
        <input onChange={selectFile} type="file"  accept="text/json" name="file" />
    )
}

export default ImportFromFile;