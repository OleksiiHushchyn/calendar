import {useDaysTaskContext} from "../../Task/DaysWithTasksContextProvider.tsx";
import {useCallback} from "react";
import dayjs from "dayjs";

interface Props {
    selectedYear: number
    selectedMonth: number
}
const ExportToFile = ({selectedYear, selectedMonth}:Props) => {
    const {daysList} = useDaysTaskContext();

    const handleImport = useCallback(() => {
        const date = dayjs(`${selectedYear}-${Number(selectedMonth + 1)}`);

        const firstDayOfMonth = date.startOf('month');
        const lastDayOfMonth = date.endOf('month');

        const result:Record<string, Array<Task>> = {};
        let current = firstDayOfMonth;
        do {
            const date = current.format('YYYY-MM-DD')
            result[date] = daysList[date] || []
            current = current.add(1, 'day');
        }while (!current.isAfter(lastDayOfMonth, 'day'))

        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(result)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `tasks-${selectedMonth}-${selectedYear}.json`;

        link.click();
    }, [selectedYear, selectedMonth, daysList])
    return (
        <button onClick={handleImport}>Import to json file</button>
    )
}

export default ExportToFile;