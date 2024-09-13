'use client';

import React from 'react'
import AddBoard from './addBoard'
import { useBoardsContext } from '../context/boards-context';

export default function Navbar() {

  const { boards, setActiveBoard } = useBoardsContext();

  console.log(boards)

  return (
    <nav className='flex items-center justify-center flex-col gap-5'>
        {boards.map(board => {
          return(
            <div className='bg-indigo-300 rounded-2xl p-2' onClick={() => setActiveBoard(board)}>
              {board.name}
            </div>
          )
        })}
        <AddBoard />
    </nav>
  )
}
