import React, {
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import PropTypes from 'prop-types'
import Context from '../../utils/context'

const ToggleAllInput = ({ allTodos }) => {
  const [isChecked, setChecked] = useState(true)
  const { toggleAll } = useContext(Context)

  useEffect(() => {
    setChecked(
      allTodos.filter((todo) => !todo.completed).length === 0
    )
  }, [allTodos])

  const handlerToggleAll = useCallback(() => {
    toggleAll(!isChecked)
  })

  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={isChecked}
        onChange={handlerToggleAll}
      />
      <label htmlFor="toggle-all" />
    </>
  )
}

ToggleAllInput.propTypes = {
  allTodos: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ToggleAllInput
