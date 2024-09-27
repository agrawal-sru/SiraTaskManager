'use client';

import React from 'react'
import AddBoard from './addBoard'
import { useBoardsContext } from '../context/boards-context';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useNavigationContext } from '../context/navigation-context';


export default function Navbar() {

  const { boards, setActiveBoard, activeBoard } = useBoardsContext();

  const { isNavigationVisible, setIsNavigationVisible } = useNavigationContext();

  return (
    <section className='flex flex-col h-full px-1 py-2'>
      {activeBoard &&
        (isNavigationVisible ?
          <button className='flex justify-end px-2' onClick={() => setIsNavigationVisible(false)}>
          <NavigateBefore />
          </button> :
          <button className='flex justify-end px-2' onClick={() => setIsNavigationVisible(true)}>
          <NavigateNext />
          </button>
        )
      }
      {isNavigationVisible &&
        <nav className='flex items-center justify-center flex-col gap-5 mt-24'>
            {boards.map(board => {
              return(
                <div key={board.id} className='bg-indigo-300 rounded-2xl p-2' onClick={() => setActiveBoard(board)}>
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
