import React from 'react';
import { useSortable } from '@dnd-kit/sortable';

interface GhostTaskProps {
    columnId: string
}

export default function GhostTask({ columnId }: GhostTaskProps) {

  const {attributes, listeners, setNodeRef} = useSortable({
    id: `ghost-${columnId}`,
    data: {
      type: 'ghost',
    }
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    />
  )
}
