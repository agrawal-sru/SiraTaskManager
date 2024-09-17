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
    editBoard: (board: BoardType) => void
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
            id: (idCount + 1).toString(),
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