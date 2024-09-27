'use client';

import { createContext, useContext, useEffect, useState } from "react";

type BoardsContextProviderProps = {
    children: React.ReactNode
};

type BoardsContextType = {
    activeBoard: BoardType | null,
    setActiveBoard: React.Dispatch<React.SetStateAction<BoardType | null>>,
    boards: BoardType[],
    addBoard: (name: string) => void,
    editBoard: (board: BoardType) => void,
    editColumn: (column: ColumnType) => void,
    editTask: (task: TaskType) => void,
};

const BoardsContext = createContext<BoardsContextType | null>(null);

export default function BoardsContextProvider({ children }: BoardsContextProviderProps) {

    const [boards, setBoards] = useState<Array<BoardType>>(() => {
        const storedValue = localStorage.getItem('MY_BOARDS');
        return storedValue ? JSON.parse(localStorage.getItem('MY_BOARDS')!) as BoardType[] : [];
    });

    const [activeBoard, setActiveBoard] = useState<BoardType | null>(null);

    useEffect(() => {
        localStorage.setItem('MY_BOARDS', JSON.stringify(boards));
    }, [boards])

    const addBoard = (name: string) => {

        const storedIdCounter = localStorage.getItem('BOARD_ID_COUNTER');
        let idCount = 0;
        if(storedIdCounter) {
            idCount = JSON.parse(localStorage.getItem('BOARD_ID_COUNTER')!) as number;
        }

        const newBoard: BoardType = {
            name,
            id: `board-${(idCount + 1)}`,
            columns: []
        };
        setBoards(boards => [...boards, newBoard]);
        setActiveBoard(newBoard);

        localStorage.setItem('BOARD_ID_COUNTER', JSON.stringify(idCount + 1));
    };

    const editBoard = (board: BoardType) => {
        const newBoards = boards.map(b => {
            if(b.name === board.name)
                return board;
            return b;
        })
        setBoards(newBoards);
    };

    const editColumn = (column: ColumnType) => {
        const board = boards.find(board => board.columns.find(col => col.id === column.id));

        if(!board)
            return;

        const columnIndex = board.columns.findIndex(col => col.id === column.id) ?? 0;
        board.columns.splice(columnIndex, 1, column);
        editBoard(board);
    }

    const editTask = (task: TaskType) => {
        const board = boards.find(board => board.columns.find(col => col.tasks.find(t => t.id === task.id)));
        if(!board)
            return;
        const column = board.columns.find(col => col.tasks.find(t => t.id === task.id));
        const newColumn = board.columns.find(col => col.id === task.column);
        if(!column || !newColumn)
            return;

        const taskIndex = column.tasks.findIndex(t => t.id === task.id);+
        column.tasks.splice(taskIndex, 1);
        newColumn.tasks.push(task);
        editColumn(column);
    }

    return (
        <BoardsContext.Provider value={{
            activeBoard,
            setActiveBoard,
            boards,
            addBoard,
            editBoard,
            editColumn,
            editTask,
        }}>
            {children}
        </BoardsContext.Provider>
    )
}

export function useBoardsContext() {
    const context = useContext(BoardsContext);

    if(context === null) {
        throw new Error(
            'useBoardsContext must be used within a BoardsContextProvider'
        );
    }
    return context;
}