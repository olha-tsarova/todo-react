/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import buttons from '../../utils/_filterButtons'

const FilterButtons = ({ activeFilter, setFilter }) => {
  const [filterButtons, setFilterButtons] = useState([])

  useEffect(() => {
    setFilterButtons(buttons)
  }, [])

  return (
    <ul className='filters'>
      {filterButtons.map((filterButton) => (
        <li key={filterButton.id}>
          <button
            type='button'
            className={classNames({
              selected: activeFilter === filterButton.id
            })}
            onClick={() => setFilter(filterButton.id)}
          >
            {filterButton.title}
          </button>
        </li>
      ))}
    </ul>
  )
}

FilterButtons.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
}

export default FilterButtons