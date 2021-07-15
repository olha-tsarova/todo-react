/* eslint-disable no-underscore-dangle */
/* eslint-disable react/react-in-jsx-scope */
import { useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const TodoItem = ({ todo, changeStatus, removeTodo }) => {
  const handleChange = useCallback(() => {
    changeStatus(todo._id)
  }, [changeStatus])

  return (
    <li
      className={classNames('todo-item', {
        completed: todo.completed
      })}
    >
      <input
        id='toggle'
        className='toggle'
        type='checkbox'
        onChange={handleChange}
        checked={!!todo.completed}
      />
      <label htmlFor='toggle'>{todo.title}</label>
      <button
        type='button'
        className='destroy'
        onClick={() => {
          removeTodo(todo._id)
        }}
      />
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  changeStatus: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
}

export default TodoItem
