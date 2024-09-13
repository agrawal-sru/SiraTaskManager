import React from 'react';

interface BoardViewProps {
    board: Board
};

export default function BoardView({ board }: BoardViewProps) {
  return (
    <section className='bg-emerald-400 w-full h-full'>
        {board.name}
    </section>
  )
}
