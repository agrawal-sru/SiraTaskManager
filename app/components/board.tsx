import { Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useBoardsContext } from '../context/boards-context';
import Column from './column';
import { boards } from '@/data/data';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier, closestCorners } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable';
import Task from './task';

interface BoardProps {
    board: BoardType
};

export default function Board({ board }: BoardProps) {

    const [newColumn, setNewColumn] = useState('');

    const { editBoard, activeBoard } = useBoardsContext();

    const [activeTask, setActiveTask] = useState<TaskType>();

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
            id: (idCount + 1).toString(),
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

    const onTaskDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if(!over || !activeTask)
            return;

        const currentColumn = board.columns.find(col => col.id === active.data.current!.sortable.containerId);
        const newColumn = board.columns.find(col => col.id === over.data.current!.sortable.containerId);

        if(!currentColumn || !newColumn)
            return;

        const oldIndex = currentColumn.tasks.findIndex(task => task.id === active.id);
        const newIndex = newColumn.tasks.findIndex(task => task.id === over.id);

        if(newColumn === currentColumn) {
            newColumn.tasks = arrayMove(newColumn.tasks, oldIndex, newIndex);
            onEditColumn(newColumn);
        }

        if(currentColumn !== newColumn) {
            currentColumn.tasks.splice(oldIndex, 1);
            newColumn.tasks.splice(newIndex, 0, activeTask)
            onEditColumn(currentColumn);
            onEditColumn(newColumn)
        }

        setActiveTask(undefined);

    }

    const onTaskDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const column = board.columns.find(col => col.id === active.data.current!.sortable.containerId);
        const task = column!.tasks.find(task => task.id === active.id);
        setActiveTask(task)
    }

    return (
        <section className='w-full h-full flex-col justify-center bg-slate-50'>
            <div className='flex w-full justify-center py-2'>
                <input value={newColumn} placeholder='Add Column' onChange={onInputChange}/>
                <Button onClick={onAddColumn} variant='contained'>+</Button>
            </div>
            <DndContext collisionDetection={closestCorners} onDragStart={onTaskDragStart} onDragEnd={onTaskDragEnd}>
                <div className='flex mx-3 my-2 w-full h-5/6 items-center gap-3 justify-evenly'>
                    {board.columns.map(column => (
                        <Column column={column} onEditColumn={onEditColumn} />
                    ))}
                </div>
                <DragOverlay>{activeTask ? <Task task={activeTask} /> : null}</DragOverlay>
            </DndContext>
        </section>
    )
}
