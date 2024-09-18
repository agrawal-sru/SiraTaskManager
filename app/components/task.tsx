import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface TaskProps {
    task: TaskType
}

export default function Task({ task }: TaskProps) {

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id: task.id,
    data: {
      type: 'task',
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div className='border rounded-lg px-2 m-2 bg-gray-200 flex items-center'
      ref={setNodeRef}
      style={style}
    >
      <GripVertical
        size={20}
        className='mr-2 text-purple-300'
        {...attributes}
        {...listeners}
      />
      <div>
        <h2 className='text-base py-2 font-semibold'>
            {task.id}
        </h2>
        <p className='flex gap-4 justify-between py-2'>
            {task.title}
        </p>
      </div>
    </div>
  )
}
