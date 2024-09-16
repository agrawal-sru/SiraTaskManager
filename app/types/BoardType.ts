interface BoardType {
    name: string,
    id: number,
    columns: ColumnType[],
}

interface ColumnType {
    name: string,
    id: number,
    tasks: TaskType[],
}

interface TaskType {
    title: string,
    id: number,
    description: string,
    column: string,
}