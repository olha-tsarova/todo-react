import React from "react";

import { ClearCompletedButton } from "./ClearCompletedButton";
import { FilterButtons } from "./FilterButtons";
import { ActiveTodosCounter } from "./ActiveTodosCounter";

export const FooterSection = ({ todos, activeFilter, setFilter }) => {
	const activeTodos = todos.filter(todo => !todo.completed)
	const completedTodos = todos.filter(todo => todo.completed)

	return (
		<section className="footer">
			{activeTodos.length > 0 &&
				<ActiveTodosCounter activeTodos={activeTodos} />
			}
			<FilterButtons activeFilter={activeFilter} setFilter={setFilter} />
			{completedTodos.length > 0 &&
				<ClearCompletedButton />
			}
		</section>
	)
}


