import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const TodoItem = ({ todo, changeStatus, removeTodo }) => {
  const handlerTodoStatusChange = useCallback(() => {
    changeStatus(todo.key)
  })

  const handlerTodoRemove = useCallback(() => {
    removeTodo(todo.key)
  })

  return (
  <li
    className={classNames('todo-item', {
      completed: todo.completed
    })}
  >
    <input
      id={`toggle-${todo.key}`}
      className="toggle"
      type="checkbox"
      onChange={handlerTodoStatusChange}
      checked={todo.completed}
    />
    <label htmlFor={`toggle-${todo.key}`}>{todo.title}</label>
    <button
      type="button"
      className="destroy"
      onClick={handlerTodoRemove}
    />
  </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  changeStatus: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
}

export default TodoItem
