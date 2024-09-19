import React from 'react'

interface TaskModalProps {
    onClose: () => void,
    task: TaskType,
}

export default function TaskModal({ onClose, task }: TaskModalProps) {

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        (e.target as Element).className.includes('modal-background') ? onClose() : null;
    }

    return (
        <div className='modal-background block fixed top-0 left-0 w-full h-full bg-[#00000099] z-10' onClick={onClick}>
            <div className='modal-main fixed bg-white w-[20%] h-auto top-[40%] left-[40%] flex flex-col items-center border-2 translate-x-[50%-30rem] translate-y-1/2 rounded-md'>
                <h1>{task.title}</h1>
                <h2>{task.id}</h2>
                <p>{task.description}</p>
                <button type='button' onClick={onClose}>Close</button>
            </div>
        </div>
    )
}
