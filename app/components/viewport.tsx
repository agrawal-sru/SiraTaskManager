'use client';

import React from 'react'
import Navbar from './navbar'
import { useBoardsContext } from '../context/boards-context'
import Board from './board';

export default function Viewport() {

  const { activeBoard } = useBoardsContext();

  return (
    <section className='flex items-center justify-center h-full w-full bg-slate-200'>
      <Navbar />
      {activeBoard ? 
        <Board board={activeBoard} />
      : <></>}
    </section>
  )
}
