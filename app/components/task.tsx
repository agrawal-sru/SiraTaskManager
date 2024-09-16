import React from 'react';
import Edit from '@mui/icons-material/Edit';

interface TaskProps {
    task: TaskType
}

export default function Task({ task }: TaskProps) {
  return (
    <div className='border rounded-lg px-2 m-2 bg-gray-200'>
        <h2 className='text-base py-2 font-semibold'>
            {task.id}
        </h2>
        <p className='flex gap-4 justify-between py-2'>
            {task.title}
        </p>
    </div>
  )
}
