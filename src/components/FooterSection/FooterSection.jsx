import React from 'react'
import PropTypes from 'prop-types'

import ClearCompletedButton from './ClearCompletedButton.jsx'
import FilterButtons from './FilterButtons.jsx'
import ActiveTodosCounter from './ActiveTodosCounter.jsx'

const FooterSection = ({
  todos,
  activeFilter,
  setFilter,
  clearCompleted
}) => {
  const activeTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  return (
    <section className="footer">
      {activeTodos.length > 0 && (
        <ActiveTodosCounter activeTodos={activeTodos} />
      )}
      <FilterButtons
        activeFilter={activeFilter}
        setFilter={setFilter}
      />
      {completedTodos.length > 0 && (
        <ClearCompletedButton clearCompleted={clearCompleted} />
      )}
    </section>
  )
}

FooterSection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  todos: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired
}

export default FooterSection
