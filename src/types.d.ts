interface Label {
    color: string
    text: string
}
interface Task {
    id: string
    text: string
    labels: Array<Label>
    date: string
    sortIndex: number
}

interface DayWithTasks {
    formattedValue: string,
    formattedDayValue: string,
    tasks: Array<Task>
    isCurrent: boolean
}

interface WorldWideHoliday {
    date: string;
    name: string
}
