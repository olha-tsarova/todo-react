import React from 'react'

export const ActiveTodosCounter = ({ activeTodos }) => {
  return (
    <span className="todo-count">
    {activeTodos.length === 1 ?
      '1 item left'
      : `${activeTodos.length} items left`
    }
    </span>
  )
}
