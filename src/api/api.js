const API_URL = 'http://127.0.0.1:9800'

export function getTodosFromServer(options) {
  return fetch(`${API_URL}${options}`)
    .then(response => response.json())
    .then(res => {
      return res
    })
}

export function queryToServer(options, method, data) {
  return fetch(`${API_URL}${options}`, {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.ok
    })
}

// async loadTodos() {
//   const newTodos = await getTodosFromServer(API_URL, GET_TODOS_URL)

//   this.todos = newTodos
// }

// async setTodo(data) {
//   await queryToServer(API_URL, ADD_TODO_URL, M_POST, data)
// }

// getTodosActive() {
//   return this.todos.filter(todo => !todo.completed)
// }

// getTodosCompleted() {
//   return this.todos.filter(todo => todo.completed)
// }

// async deleteTodos(data) {
//   await queryToServer(API_URL, DELETE_TODOS_URL, M_DELETE, data)
// }

// async changeTodo(data) {
//   await queryToServer(API_URL, EDIT_TODO_URL, M_PATCH, data)
// }

// async changeTodos(data) {
//   await queryToServer(API_URL, CHANGE_STATUSES_URL, M_PATCH, data)
// }
