import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from '../TodoItem'

const TodoList = ({ todos, changeStatus, removeTodo }) => (
  <ul className='todo-list'>
    {todos.map((todo) => (
      <TodoItem
        todo={todo}
        key={todo.key}
        changeStatus={changeStatus}
        removeTodo={removeTodo}
      />
    ))}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeStatus: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
}

export default TodoList
