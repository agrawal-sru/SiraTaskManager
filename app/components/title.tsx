'use client';

import React from 'react'
import { useBoardsContext } from '../context/boards-context';
import { useNavigationContext } from '../context/navigation-context';

export default function Title() {
  
  const { activeBoard, setActiveBoard } = useBoardsContext();

  const { setIsNavigationVisible } = useNavigationContext();

  const onTitleClick = () => {
    setActiveBoard(null);
    setIsNavigationVisible(true);
  }

  return (
    <section className={'flex w-full px-5 py-5 bg-orange-100 ' + (activeBoard ? 'justify-between' : 'justify-center items-center')}>
      <button onClick={onTitleClick} disabled={!activeBoard}>
        <h1 className='text-4xl text-sky-500 font-mono font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-yellow-400 text-transparent bg-clip-text'>
            {activeBoard ? 'Sira' : 'Sira Task Manager'}
        </h1>
      </button>
      {activeBoard ?
      <h2 className='text-xl font-sans font-medium'>
        {activeBoard.name}
      </h2> :
      <></>}
    </section>
  )
}
