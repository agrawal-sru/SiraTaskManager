import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface GhostTaskProps {
    columnId: string
}

export default function GhostTask({ columnId }: GhostTaskProps) {

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
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
