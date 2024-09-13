'use client';

import React from 'react'
import Navbar from './navbar'
import { useBoardsContext } from '../context/boards-context'
import BoardView from './boardView';

export default function Viewport() {

  const { activeBoard } = useBoardsContext();

  return (
    <section className='flex items-center justify-center h-full w-full bg-slate-200'>
        <Navbar />
        {activeBoard ? 
          <BoardView board={activeBoard} />
        : <></>}
    </section>
  )
}
