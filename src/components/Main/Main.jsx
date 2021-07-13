import React from "react";
import { ToggleAllInput } from "./ToggleAllInput";
import { TodoList } from "../TodoList/TodoList";

export const MainSection = ({ todos, changeStatus }) => {
	return (
		<section className="main">
			<ToggleAllInput />
			<TodoList todos={todos} changeStatus={changeStatus} />
		</section>
	)
}
