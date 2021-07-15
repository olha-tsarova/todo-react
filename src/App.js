/* eslint-disable no-param-reassign */
// eslint-disable-next-line object-curly-newline
import React, { useCallback, useEffect, useRef, useState } from 'react'
import uuid from 'react-uuid'
import MainSection from './components/MainSection'
import FooterSection from './components/FooterSection'
import Context from './utils/context'
import { getTodosFromServer, queryToServer } from './api/api'
import { filters, endpoints, fetchMethods } from './utils/constants'

function App() {
  const [todoItems, setTodos] = useState([])
  const [todoToRender, setTodosToRender] = useState(todoItems)
  const [activeFilter, setFilter] = useState(filters.all)
  const todosRef = useRef()

  todosRef.current = todoItems

  useEffect(() => {
    getTodosFromServer(endpoints.GET_TODOS_URL)
      .then((response) => {
        if (response) {
          setTodos(response)
        } else {
          console.error('Sorry, something went wrong')
        }
      })
  }, [])

  useEffect(() => {
    if (activeFilter === filters.active) {
      setTodosToRender(todosRef.current.filter((todo) => !todo.completed))
    }

    if (activeFilter === filters.completed) {
      setTodosToRender(todosRef.current.filter((todo) => todo.completed))
    }

    if (activeFilter === filters.all) {
      setTodosToRender(todosRef.current)
    }
  }, [activeFilter, todosRef.current])

  const addTodo = useCallback((text) => {
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
            ...todosRef.current,
            newTodo
          ])
        } else {
          console.error('Sorry, something went wrong')
        }
      })
  }, [])

  const removeTodo = (todoId) => {
    queryToServer(endpoints.DELETE_TODOS_URL, fetchMethods.M_DELETE, todoId)
      .then((res) => {
        if (res) {
          setTodos((state) => state.filter((todo) => todo.key !== todoId))
        } else {
          console.error('Sorry, something went wrong')
        }
      })
  }

  const changeStatus = useCallback((todoKey) => {
    const todoForChange = todosRef.current.find((todo) => todo.key === todoKey)
    const changedTodos = todosRef.current.map((todo) => {
      if (todo.key === todoKey) {
        todo.completed = !todo.completed
      }
      return todo
    })

    queryToServer(endpoints.EDIT_TODO_URL, fetchMethods.M_PATCH, todoForChange)
      .then((res) => {
        if (res) {
          setTodos(changedTodos)
        } else {
          console.error('Sorry, something went wrong')
        }
      })
  }, [])

  const clearCompleted = useCallback(() => {
    const completedTodos = todosRef.current.filter((todo) => todo.completed)
    const completedTodosKeys = []
    completedTodos.forEach((todo) => completedTodosKeys.push(todo.key))

    queryToServer(endpoints.DELETE_TODOS_URL, fetchMethods.M_DELETE, completedTodosKeys)
      .then((res) => {
        if (res) {
          setTodos((state) => state.filter((todo) => !todo.completed))
        } else {
          console.error('Sorry, something went wrong')
        }
      })
  }, [todoItems])

  const toggleAll = useCallback((status) => {
    const todosData = {
      keys: [], data: { completed: status }
    }

    todosRef.current.forEach((todo) => {
      todosData.keys.push(todo.key)
    })

    queryToServer(endpoints.CHANGE_STATUSES_URL, fetchMethods.M_PATCH, todosData)
      .then((res) => {
        if (res) {
          setTodos(todosRef.current.map((todo) => ({ ...todo, completed: status })))
        } else {
          console.error('Sorry, something went wrong')
        }
      })
  }, [])

  const handlerAddTodo = useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      addTodo(event.target.value)
      event.target.value = ''
    }
  })

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
              onKeyPress={handlerAddTodo}
            />
          </form>
        </header>
        {todoItems.length > 0
        && (
          <>
            <MainSection
              todos={todoToRender}
              allTodos={todosRef.current}
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
