'use client';

import React from 'react'
import { useBoardsContext } from '../context/boards-context';

export default function 
() {
  
  const { activeBoard } = useBoardsContext();

  return (
    <section className={'flex w-full px-5 py-5 bg-orange-100 ' + (activeBoard ? 'justify-between' : 'justify-center items-center')}>
        <h1 className='text-4xl text-sky-500 font-mono font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-yellow-400 text-transparent bg-clip-text'>
            {activeBoard ? 'Sira' : 'Sira Task Manager'}
        </h1>
        {activeBoard ?
        <h2 className='text-xl font-sans font-medium'>
          {activeBoard.name}
        </h2> :
        <></>}
    </section>
  )
}
