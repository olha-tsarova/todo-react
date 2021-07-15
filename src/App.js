/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import MainSection from './components/MainSection'
import FooterSection from './components/FooterSection'
import Context from './utils/context'
import { getTodosFromServer, queryToServer } from './api/api'
import { filters, endpoints, fetchMethods } from './utils/_constants'

function App() {
  const [todoItems, setTodos] = useState([])
  const [todoToRender, setTodosToRender] = useState(todoItems)
  const [activeFilter, setFilter] = useState(filters.filter_all)

  useEffect(() => {
    getTodosFromServer(endpoints.GET_TODOS_URL)
      .then((response) => setTodos(response))
  }, [])

  useEffect(() => {
    if (activeFilter === filters.filter_active) {
      setTodosToRender(todoItems.filter((todo) => !todo.completed))
    }

    if (activeFilter === filters.filter_completed) {
      setTodosToRender(todoItems.filter((todo) => todo.completed))
    }

    if (activeFilter === filters.filter_all) {
      setTodosToRender(todoItems)
    }
  }, [activeFilter, todoItems])

  const addTodo = (text) => {
    const task = text.trim()
    if (!task) {
      return
    }

    const newTodo = {
      title: task,
      completed: false,
      key: uuid()
    }

    queryToServer(endpoints.ADD_TODO_URL, fetchMethods.M_POST, newTodo)
      .then((res) => {
        if (res) {
          setTodos([
            ...todoItems,
            newTodo
          ])
        }
      })
  }

  const removeTodo = (todoId) => {
    queryToServer(endpoints.DELETE_TODOS_URL, fetchMethods.M_DELETE, todoId)
      .then((res) => {
        if (res) {
          setTodos(todoItems.filter((todo) => todo._id !== todoId))
        }
      })
  }

  const changeStatus = (todoId) => {
    const todoForChange = todoItems.find((todo) => todo._id === todoId)

    queryToServer(endpoints.EDIT_TODO_URL, fetchMethods.M_PATCH, todoForChange)
      .then((res) => {
        if (res) {
          setTodos(todoItems.map((todo) => {
            if (todo._id === todoId) {
              todo.completed = !todo.completed
            }
            return todo
          }))
        }
      })
  }

  const clearCompleted = () => {
    const completedTodos = todoItems.filter((todo) => todo.completed)
    const completedTodosIds = []
    completedTodos.forEach((todo) => completedTodosIds.push(todo._id))

    queryToServer(endpoints.DELETE_TODOS_URL, fetchMethods.M_DELETE, completedTodosIds)
      .then((res) => {
        if (res) {
          setTodos((state) => state.filter((todo) => !todo.completed))
        }
      })
  }

  const toggleAll = (status) => {
    const todosData = {
      ids: [], data: { completed: status }
    }

    todoItems.forEach((todo) => {
      todosData.ids.push(todo._id)
    })

    queryToServer(endpoints.CHANGE_STATUSES_URL, fetchMethods.M_PATCH, todosData)
      .then((res) => {
        if (res) {
          setTodos(todoItems.map((todo) => ({ ...todo, completed: status })))
        }
      })
  }

  return (
    <Context.Provider value={{ toggleAll }}>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form>
            <input
              className="new-todo"
              type="text"
              placeholder="What needs to be done?"
              autoFocus
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  addTodo(event.target.value)
                  event.target.value = ''
                }
              }}
            />
          </form>
        </header>
        {todoItems.length > 0
        && (
          <>
            <MainSection
              todos={todoToRender}
              allTodos={todoItems}
              changeStatus={changeStatus}
              removeTodo={removeTodo}
            />
            <FooterSection
              todos={todoItems}
              activeFilter={activeFilter}
              setFilter={setFilter}
              clearCompleted={clearCompleted}
            />
          </>
        )}
      </section>
    </Context.Provider>
  )
}

export default App
