interface BoardType {
    name: string,
    id: string,
    columns: ColumnType[],
}

interface ColumnType {
    name: string,
    id: string,
    tasks: TaskType[],
}

interface TaskType {
    title: string,
    id: string,
    description: string,
    column: string,
}