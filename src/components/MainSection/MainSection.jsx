/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import ToggleAllInput from '../ToggleAllInput'
import TodoList from '../Todo/TodoList'

// eslint-disable-next-line object-curly-newline
const MainSection = ({ todos, allTodos, changeStatus, removeTodo }) => (
  <section className='main'>
    <ToggleAllInput allTodos={allTodos} />
    <TodoList
      todos={todos}
      changeStatus={changeStatus}
      removeTodo={removeTodo}
    />
  </section>
)

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  allTodos: PropTypes.array.isRequired,
  changeStatus: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
}

export default MainSection
