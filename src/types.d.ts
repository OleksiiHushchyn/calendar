interface Label {
    color: string
}
interface Task {
    text: string
    labels: Array<Label>
}

interface DayWithTasks {
    formattedValue: string,
    formattedDayValue: string,
    tasks: Array<Task>
}
