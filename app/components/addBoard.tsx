'use client';

import React, { useState } from 'react'
import { Button } from "@mui/material";
import { useBoardsContext } from '../context/boards-context';

export default function AddBoard() {

    const [boardName, setBoardName] = useState('');
    const { addBoard } = useBoardsContext();

    const onAddClick = () => {
        addBoard(boardName);
        setBoardName('');
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBoardName(e.target.value);
    }

    return (
        <div className='px-1 flex'>
            <input placeholder='Add Board' value={boardName} onChange={onInputChange}/>
            <Button variant="contained" onClick={onAddClick}>+</Button>
        </div>
    )
}
