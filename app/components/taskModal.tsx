import React, { useState } from 'react'
import { useBoardsContext } from '../context/boards-context';

interface TaskModalProps {
    onClose: () => void,
    task: TaskType,
}

export default function TaskModal({ onClose, task }: TaskModalProps) {

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        (e.target as Element).className.includes('modal-background') ? onModalClose() : null;
    }

    const { activeBoard, editTask } = useBoardsContext();

    const [editedTask, setEditedTask] = useState<TaskType>(task);

    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const onModalClose = () => {
        onClose();
    }

    const onSave = () => {
        editTask(editedTask);
        onModalClose();
    }

    return (
        <div className='modal-background block fixed top-0 left-0 w-full h-full bg-[#00000099] z-10' onClick={onClick}>
            <div className='modal-main fixed bg-white w-[50%] h-auto top-[40%] left-[25%] flex flex-col items-center border-2 translate-x-[50%-30rem] translate-y-1/2 rounded-md'>
                <div className='bg-slate-300 w-full top-0'>
                    {isEditingTitle ?
                        <input className='px-4 my-2 font-semibold border border-slate-500' value={editedTask.title} onChange={e => setEditedTask({...editedTask, title: e.target.value})}/> :
                        <h1 className='px-4 my-2 font-bold' onDoubleClick={() => setIsEditingTitle(true)}>{task.title}</h1>
                    }
                </div>
                <div className='w-full px-4 py-5'>
                    <div className='flex pb-5 justify-between'>
                        <div>
                            <h2 className='font-medium'>Task ID</h2>
                            <input className='bg-gray-300 border border-slate-700 w-1/2 rounded-sm text-end' disabled value={task.id}/>
                        </div>
                        <div>
                            <h2 className='font-medium'>Category</h2>
                            <select className='border border-slate-700 rounded-sm' value={editedTask.column} onChange={e => setEditedTask({...editedTask, column: e.currentTarget.value})}>
                                <option selected value={task.column}>{activeBoard?.columns.find(col => col.id === task.column)?.name}</option>
                                {activeBoard?.columns.map(column => {
                                    
                                    if(column.id === task.column)
                                        return;

                                    return (
                                        <option key={column.id} value={column.id}>{column.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='justify-center border min-h-28 border-slate-700 rounded-md'>
                        <textarea className='w-full h-28 px-2 py-2' value={editedTask.description} placeholder='Enter a description' onChange={e => setEditedTask({...editedTask, description: e.target.value})}/>
                    </div>
                </div>
                <div className='w-full pb-2 flex justify-end gap-2 px-4'>
                    <button className='border border-slate-700 px-2 rounded-sm hover:bg-slate-400' type='button' onClick={onSave}>Save</button>
                    <button className='border border-slate-700 px-2 rounded-r-sm hover:bg-slate-400' type='button' onClick={onModalClose}>Close</button>
                </div>
            </div>
        </div>
    )
}
