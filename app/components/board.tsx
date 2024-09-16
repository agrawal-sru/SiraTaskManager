import { Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useBoardsContext } from '../context/boards-context';
import Column from './column';
import { boards } from '@/data/data';

interface BoardProps {
    board: BoardType
};

export default function Board({ board }: BoardProps) {

    const [newColumn, setNewColumn] = useState('');

    const { editBoard, activeBoard } = useBoardsContext();

    useEffect(() => {
        setNewColumn('');
    }, [activeBoard])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewColumn(e.target.value);
    };

    const onAddColumn = () => {

        const storedIdCounter = localStorage.getItem('COLUMN_ID_COUNTER');
        let idCount = 0;
        if(storedIdCounter) {
            idCount = JSON.parse(localStorage.getItem('COLUMN_ID_COUNTER')!) as number;
        }

        if(newColumn === '')
            return;
        const col: ColumnType = {
            name: newColumn,
            id: idCount + 1,
            tasks: []
        };
        board.columns.push(col);
        setNewColumn('');
        editBoard(board);

        localStorage.setItem('COLUMN_ID_COUNTER', JSON.stringify(idCount + 1));
    };

    const onEditColumn = useCallback(( column: ColumnType ) => {
        board.columns = board.columns.map(col => {
            return col.id === column.id ? column : col;
        });
        editBoard(board);
    }, [boards, activeBoard])

    return (
        <section className='w-full h-full flex-col justify-center bg-slate-50'>
            <div className='flex w-full justify-center py-2'>
                <input value={newColumn} placeholder='Add Column' onChange={onInputChange}/>
                <Button onClick={onAddColumn} variant='contained'>+</Button>
            </div>
            <div className='flex mx-3 my-2 w-full h-5/6 items-center gap-3 justify-evenly'>
                {board.columns.map(column => (
                    <Column column={column} onEditColumn={onEditColumn} />
                ))}
            </div>
        </section>
    )
}
