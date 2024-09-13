'use client';

import { createContext, useContext, useEffect, useState } from "react";

type BoardsContextProviderProps = {
    children: React.ReactNode
};

type BoardsContextType = {
    activeBoard: Board | null,
    setActiveBoard: React.Dispatch<React.SetStateAction<Board | null>>,
    boards: Board[],
    addBoard: (name: string) => void,
    editBoard: (board: Board) => void
};

const BoardsContext = createContext<BoardsContextType | null>(null);

export default function BoardsContextProvider({ children }: BoardsContextProviderProps) {

    const [boards, setBoards] = useState<Array<Board>>(() => {
        const storedValue = localStorage.getItem('MY_BOARDS');
        return storedValue ? JSON.parse(localStorage.getItem('MY_BOARDS')!) as Board[] : []
    });

    const [activeBoard, setActiveBoard] = useState<Board | null>(null);

    useEffect(() => {
        console.log('adding to local storage')
        localStorage.setItem('MY_BOARDS', JSON.stringify(boards));
    }, [boards])

    const addBoard = (name: string) => {
        const newBoard: Board = {
            name,
            columns: []
        };
        setBoards(boards => [...boards, newBoard]);
        setActiveBoard(newBoard);
    };

    const editBoard = (board: Board) => {
        const newBoards = boards.map(b => {
            if(b.name === board.name)
                return board;
            return b;
        })
        setBoards(newBoards);
    };

    return (
        <BoardsContext.Provider value={{
            activeBoard,
            setActiveBoard,
            boards,
            addBoard,
            editBoard
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