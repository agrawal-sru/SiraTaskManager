'use client';

import React, { useState } from 'react'
import AddBoard from './addBoard'
import { useBoardsContext } from '../context/boards-context';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';


export default function Navbar() {

  const { boards, setActiveBoard, activeBoard } = useBoardsContext();

  const [navVisible, setNavVisible] = useState(true);

  return (
    <section className='flex flex-col h-full px-1 py-2'>
      {activeBoard &&
        (navVisible ?
          <button className='flex justify-end px-2' onClick={() => setNavVisible(false)}>
          <NavigateBefore />
          </button> :
          <button className='flex justify-end px-2' onClick={() => setNavVisible(true)}>
          <NavigateNext />
          </button>
        )
      }
      {navVisible &&
        <nav className='flex items-center justify-center flex-col gap-5 mt-24'>
            {boards.map(board => {
              return(
                <div className='bg-indigo-300 rounded-2xl p-2' onClick={() => setActiveBoard(board)}>
                  {board.name}
                </div>
              )
            })}
            <AddBoard />
        </nav>
      }
    </section>
  )
}
