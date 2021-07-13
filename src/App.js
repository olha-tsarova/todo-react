import './App.css'
import { MainSection } from "./components/Main/Main"
import { FooterSection } from "./components/Footer/Footer"
import Context from './context'
import { useEffect, useState } from 'react'
import { getTodosFromServer, queryToServer } from './api/api'
import { filters, endpoints, fetch_methods } from './_variables'

function App() {
	const [todoItems, changeTodos] = useState([])
	const [todoToRender, changeTodosToRender] = useState(todoItems)
	const [activeFilter, setFilter] = useState(filters.filter_all)

	useEffect(() => {
		getTodosFromServer(endpoints.GET_TODOS_URL)
			.then(response => changeTodos(response))
	}, [])

	useEffect(() => {
		if (activeFilter === filters.filter_active) {
			changeTodosToRender(todoItems.filter(todo => !todo.completed))
		}

		if (activeFilter === filters.filter_completed) {
			changeTodosToRender(todoItems.filter(todo => todo.completed))
		}

		if (activeFilter === filters.filter_all) {
			changeTodosToRender(todoItems)
		}
	}, [activeFilter, todoItems])

	function addTodo(text) {
		let task = text.trim()
		if (!task) {
			return
		}

		const newTodo = {
			title: task,
			completed: false,
			id: todoItems.length + 1
		}

		queryToServer(endpoints.ADD_TODO_URL, fetch_methods.M_POST, newTodo)
	}

	function removeTodo(todoId) {
		changeTodos(todoItems.filter(todo => todo.id !== todoId))
	}

	function changeStatus(todoId) {
		changeTodos(todoItems.map(todo => {
			if (todo.id === todoId) {
				todo.completed = !todo.completed
			}
			return todo
		}))
	}

  return (
		<Context.Provider value={{ removeTodo }}>
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
									addTodo(event.target.value)
								}
							}}
						/>
					</form>
				</header>
				{todoItems.length > 0 &&
					<>
						<MainSection
							todos={todoToRender}
							changeStatus={changeStatus}
						/>
						<FooterSection
						  todos={todoItems}
							activeFilter={activeFilter}
							setFilter={setFilter}
						/>
					</>
				}
			</section>
		</Context.Provider>
  );
}

export default App;
