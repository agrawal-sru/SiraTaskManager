import React, { useState } from 'react'
import Task from './task'
import { Button } from '@mui/material'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import GhostTask from './ghostTask'

interface ColumnProps {
    column: ColumnType
    onEditColumn: (column: ColumnType) => void
};

export default function Column({ column, onEditColumn }: ColumnProps) {

    const [newTask, setNewTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(column.name);

    const { setNodeRef } = useDroppable({ id: column.id, data: { type: 'column' } });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
    };

    const setNewColumnName = () => {
        if(newName === '')
            return;
        onEditColumn({ ...column, name: newName })
        setIsEditing(false);
    }

    const onAddTask = () => {

        const storedIdCounter = localStorage.getItem('TASK_ID_COUNTER');
        let idCount = 0;
        if(storedIdCounter) {
            idCount = JSON.parse(localStorage.getItem('TASK_ID_COUNTER')!) as number;
        }

        const task: TaskType = {
            title: newTask,
            description: '',
            column: column.id,
            id: `task-${(idCount + 1)}`,
        }
        column.tasks.push(task);
        setNewTask('');
        onEditColumn(column);

        localStorage.setItem('TASK_ID_COUNTER',JSON.stringify(idCount + 1));
    }

    return (
        <div className='items-center h-full p-2 w-fit flex-col flex border border-slate-700' id={column.id} >
            <h1 className='bg-blue-300 rounded-xl w-fit p-1' onClick={() => setIsEditing(true)}>
                {isEditing ?
                <input
                    autoFocus
                    className='w-full'
                    onBlur={setNewColumnName}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                /> 
                : column.name}
            </h1>
            <div>
                <div className='flex p-1'>
                    <input placeholder='Add Task' value={newTask} onChange={onInputChange}/>
                    <Button variant='contained' onClick={onAddTask}>+</Button>
                </div>
                <SortableContext id={column.id} items={column.tasks} strategy={verticalListSortingStrategy}>
                    <div ref={setNodeRef}>
                        {column.tasks.map(task => (
                            <Task key={task.id} task={task} />
                        ))}
                        {column.tasks.length > 0 ? <GhostTask columnId={column.id} /> : null }
                    </div>
                </SortableContext>
            </div>
        </div>
    )
}
