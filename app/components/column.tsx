import React, { useState } from 'react'
import Task from './task'
import { Button } from '@mui/material'

interface ColumnProps {
    column: ColumnType
    onEditColumn: (column: ColumnType) => void
};

export default function Column({ column, onEditColumn }: ColumnProps) {

    const [newTask, setNewTask] = useState('');

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
    };

    const onAddTask = () => {
        const task: TaskType = {
            title: newTask,
            description: '',
            column: column.name,
            id: 0,
        }
        column.tasks.push(task);
        setNewTask('');
        onEditColumn(column);
    }

    return (
        <div className='items-center py-1 w-fit flex-col flex'>
            <h1 className='bg-blue-300 rounded-xl w-fit'>
                {column.name}
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
