import React, { useContext } from "react";
import classNames from "classnames";
import  Context from "../../context";

export const TodoItem = ({ todo, changeStatus }) => {
	const { removeTodo } = useContext(Context)
	return (
		<li
			className={classNames('todo-item', {
				completed: todo.completed
			})}
		>
			<input
				className="toggle"
				type="checkbox"
				onChange={() => {changeStatus(todo.id)}}
				checked={todo.completed ? true : false}
			/>
			<label>
				{todo.title}
			</label>
			<button
				type="button"
				className="destroy"
				onClick={() => {removeTodo(todo.id)}}
			/>
		</li>
	)
}
