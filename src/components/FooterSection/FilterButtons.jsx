import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { buttons } from '../../utils/constants'

const FilterButtons = ({ activeFilter, setFilter }) => {
  const [filterButtons, setFilterButtons] = useState([])

  useEffect(() => {
    setFilterButtons(buttons)
  }, [])

  const handlerSetFilter = useCallback((event) => {
    setFilter(event.target.textContent)
  })

  return (
    <ul className='filters'>
      {filterButtons.map((filterButton) => (
        <li key={filterButton.key}>
          <button
            type='button'
            className={classNames({
              selected: activeFilter === filterButton.key
            })}
            onClick={handlerSetFilter}
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
