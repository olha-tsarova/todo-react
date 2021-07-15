/* eslint-disable import/prefer-default-export */
import React from 'react'
import PropTypes from 'prop-types'

const ClearCompletedButton = ({ clearCompleted }) => (
  <button
    className='clear-completed'
    type='button'
    onClick={() => {
      clearCompleted()
    }}
  >
    Clear completed
  </button>
)

ClearCompletedButton.propTypes = {
  clearCompleted: PropTypes.func.isRequired
}

export default ClearCompletedButton
