'use client';

import React from 'react'
import AddBoard from './addBoard'
import { useBoardsContext } from '../context/boards-context';
import Link from 'next/link';

export default function Navbar() {

  const { boards, setActiveBoard } = useBoardsContext();

  return (
    <div>
        {boards.map(board => {
          return(
            <div onClick={() => setActiveBoard(board)}>
              {board.name}
            </div>
          )
        })}
        <AddBoard />
    </div>
  )
}
