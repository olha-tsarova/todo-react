import React from 'react'
import PropTypes from 'prop-types'

const ActiveTodosCounter = ({ activeTodos }) => (
  <span className='todo-count'>
    {activeTodos.length === 1
      ? '1 item left'
      : `${activeTodos.length} items left`}
  </span>
)

ActiveTodosCounter.propTypes = {
  activeTodos: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ActiveTodosCounter
