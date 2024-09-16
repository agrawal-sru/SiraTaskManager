import React, { useState } from 'react'
import Task from './task'
import { Button } from '@mui/material'

interface ColumnProps {
    column: ColumnType
    onEditColumn: (column: ColumnType) => void
};

export default function Column({ column, onEditColumn }: ColumnProps) {

    const [newTask, setNewTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(column.name);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
    };

    const setNewColumnName = () => {
        if(newName === '')
            return;
        console.log(newName);
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
            column: column.name,
            id: idCount + 1,
        }
        column.tasks.push(task);
        setNewTask('');
        onEditColumn(column);

        localStorage.setItem('TASK_ID_COUNTER',JSON.stringify(idCount + 1));
    }

    return (
        <div className='items-center h-full p-2 w-fit flex-col flex border border-slate-700'>
            <h1 className='bg-blue-300 rounded-xl w-fit' onClick={() => setIsEditing(true)}>
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
                {column.tasks.map(task => (
                    <Task task={task} />
                ))}
                <div className='flex p-1'>
                    <input placeholder='Add Task' value={newTask} onChange={onInputChange}/>
                    <Button variant='contained' onClick={onAddTask}>+</Button>
                </div>
            </div>
        </div>
    )
}
