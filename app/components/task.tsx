import React from 'react'

interface TaskProps {
    task: TaskType
}

export default function Task({ task }: TaskProps) {
  return (
    <div>{task.title}</div>
  )
}
