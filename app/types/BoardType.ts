interface Board {
    name: string,
    columns: Column[],
}

interface Column {
    name: string,
    tasks: Task[],
}

interface Task {
    title: string,
    id: number,
    description: string,
    column: string,
}