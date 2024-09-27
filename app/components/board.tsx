import { Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useBoardsContext } from '../context/boards-context';
import Column from './column';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from '@dnd-kit/core'
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
            id: `col-${(idCount + 1)}`,
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
    }, [activeBoard, board, editBoard])

    const onTaskDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        const currentColumn = board.columns.find(col => col.id === active.data.current!.sortable.containerId);

        if(!over || !activeTask || !currentColumn)
            return;

        const oldIndex = currentColumn.tasks.findIndex(task => task.id === active.id);

        // populated column
        if(over.data.current!.type === 'task') {

            // same column
            if(over.data.current!.sortable.containerId === currentColumn.id) {
                const newIndex = currentColumn.tasks.findIndex(task => task.id === over.id);
                currentColumn.tasks = arrayMove(currentColumn.tasks, oldIndex, newIndex);
            }
            else {
                const newColumn = board.columns.find(col =>
                    col.id === over.data.current!.sortable.containerId
                );
                
                if(!newColumn)
                    return;
                
                const newIndex = newColumn.tasks.findIndex(task => task.id === over.id);
                currentColumn.tasks.splice(oldIndex, 1);
                activeTask.column = newColumn.id;
                newColumn.tasks.splice(newIndex, 0, activeTask);
                onEditColumn(newColumn);
            }
        }

        // empty column
        if(over.data.current!.type === 'column') {
            const newColumn = board.columns.find(col => col.id === over.id);
            if(!newColumn)
                return;

            currentColumn.tasks.splice(oldIndex, 1);
            activeTask.column = newColumn.id;
            newColumn.tasks.push(activeTask);
            onEditColumn(newColumn);
        }

        // 'ghost task'
        // fix to bug when adding task to bottom of populated column
        if(over.data.current!.type === 'ghost') {
            const newColumn = board.columns.find(col =>
                col.id === over.data.current!.sortable.containerId
            );
            
            if(!newColumn)
                return;
            
            currentColumn.tasks.splice(oldIndex, 1);
            activeTask.column = newColumn.id;
            newColumn.tasks.push(activeTask);
            onEditColumn(newColumn);
        }

        onEditColumn(currentColumn);
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
                <div className='flex mx-3 my-2 w-[95%] h-5/6 items-center gap-2 justify-evenly'>
                    {board.columns.map(column => (
                        <Column key={column.id} column={column} onEditColumn={onEditColumn} />
                    ))}
                </div>
                <DragOverlay>{activeTask ? <Task task={activeTask} /> : null}</DragOverlay>
            </DndContext>
        </section>
    )
}
