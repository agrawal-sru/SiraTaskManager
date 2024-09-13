interface BoardType {
    name: string,
    columns: ColumnType[],
}

interface ColumnType {
    name: string,
    tasks: TaskType[],
}

interface TaskType {
    title: string,
    id: number,
    description: string,
    column: string,
}