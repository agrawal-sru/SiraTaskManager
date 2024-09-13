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
        if(newColumn === '')
            return;
        const col: ColumnType = {
            name: newColumn,
            tasks: []
        };
        board.columns.push(col);
        setNewColumn('');
        editBoard(board);
    };

    const onEditColumn = useCallback(( column: ColumnType ) => {
        board.columns = board.columns.map(col => {
            if(col.name === column.name)
                return column;
            return col;
        });
        editBoard(board);
    }, [boards, activeBoard])

    return (
        <section className='bg-emerald-400 w-full h-full flex-col justify-center'>
            <div className='flex w-full justify-center py-2'>
                <input value={newColumn} placeholder='Add Column' onChange={onInputChange}/>
                <Button onClick={onAddColumn} variant='contained'>+</Button>
            </div>
            <div className='flex mx-3 my-2 w-full items-center gap-3 justify-evenly'>
                {board.columns.map(column => (
                    <Column column={column} onEditColumn={onEditColumn} />
                ))}
            </div>
        </section>
    )
}
