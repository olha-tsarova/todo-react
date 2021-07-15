export const filters = {
  completed: 'Completed',
  active: 'Active',
  all: 'All'
}

export const endpoints = {
  GET_TODOS_URL: '/todos',
  ADD_TODO_URL: '/addtodo',
  DELETE_TODOS_URL: '/delete',
  EDIT_TODO_URL: '/edit',
  CHANGE_STATUSES_URL: '/changestatuses'
}

export const fetchMethods = {
  M_GET: 'GET',
  M_POST: 'POST',
  M_PATCH: 'PATCH',
  M_DELETE: 'DELETE'
}

export const buttons = [
  { key: filters.all, title: filters.all },
  { key: filters.active, title: filters.active },
  { key: filters.completed, title: filters.completed }
]
