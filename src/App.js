/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import MainSection from './components/Main/Main';
import FooterSection from './components/Footer';
import Context from './context';
import { getTodosFromServer, queryToServer } from './api/api';
import { filters, endpoints, fetchMethods } from './_variables';

function App() {
  const [todoItems, changeTodos] = useState([]);
  const [todoToRender, changeTodosToRender] = useState(todoItems);
  const [activeFilter, setFilter] = useState(filters.filter_all);

  useEffect(() => {
    getTodosFromServer(endpoints.GET_TODOS_URL)
      .then((response) => changeTodos(response));
  }, []);

  useEffect(() => {
    if (activeFilter === filters.filter_active) {
      changeTodosToRender(todoItems.filter((todo) => !todo.completed));
    }

    if (activeFilter === filters.filter_completed) {
      changeTodosToRender(todoItems.filter((todo) => todo.completed));
    }

    if (activeFilter === filters.filter_all) {
      changeTodosToRender(todoItems);
    }
  }, [activeFilter, todoItems]);

  function addTodo(text) {
    const task = text.trim();
    if (!task) {
      return;
    }

    const newTodo = {
      title: task,
      completed: false,
      key: uuid(),
    };

    changeTodos([
      ...todoItems,
      newTodo,
    ]);

    queryToServer(endpoints.ADD_TODO_URL, fetchMethods.M_POST, newTodo);
  }

  function removeTodo(todoId) {
    changeTodos(todoItems.filter((todo) => todo._id !== todoId));

    queryToServer(endpoints.DELETE_TODOS_URL, fetchMethods.M_DELETE, todoId);
  }

  function changeStatus(todoId) {
    changeTodos(todoItems.map((todo) => {
      if (todo._id === todoId) {
        todo.completed = !todo.completed;
      }
      return todo;
    }));

    const todoForChange = todoItems.find((todo) => todo._id === todoId);

    queryToServer(endpoints.EDIT_TODO_URL, fetchMethods.M_PATCH, todoForChange);
  }

  function clearCompleted() {
    const completedTodos = todoItems.filter((todo) => todo.completed);
    const completedTodosIds = [];
    completedTodos.forEach((todo) => completedTodosIds.push(todo._id));

    queryToServer(endpoints.DELETE_TODOS_URL, fetchMethods.M_DELETE, completedTodosIds)
      .then((res) => {
        if (res) {
          changeTodos((state) => state.filter((todo) => !todo.completed));
        }
      });
  }

  function toggleAll(status) {
    const todosData = {
      ids: [], data: { completed: status },
    };

    todoItems.forEach((todo) => {
      todo.completed = status;
      todosData.ids.push(todo._id);
    });

    changeTodos(todoItems.map((todo) => ({ ...todo, completed: status })));

    queryToServer(endpoints.CHANGE_STATUSES_URL, fetchMethods.M_PATCH, todosData);
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
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addTodo(event.target.value);
                  event.target.value = '';
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
  );
}

export default App;
