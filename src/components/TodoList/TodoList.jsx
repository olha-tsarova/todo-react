import React from "react";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, changeStatus }) => {
	return (
		<ul className="todo-list">
			{todos.map(todo => (
				<TodoItem
				  todo={todo}
					key={todo.id}
					changeStatus={changeStatus}
				/>
			))}
		</ul>
	)
}
