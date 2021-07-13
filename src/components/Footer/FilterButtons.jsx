import classNames from "classnames";
import React, {useEffect, useState} from "react";
import { filters } from "../../_variables";

const buttons = [{id: filters.filter_all, title: 'All'}, {id: filters.filter_active, title: 'Active'}, {id: filters.filter_completed, title: 'Completed'}]

export const FilterButtons = ({ activeFilter, setFilter }) => {
	const [filterButtons, setFilterButtons] = useState([])
	// const [filter, setFilter] = useState(filter_all)

	useEffect(() => {
		setFilterButtons(buttons)
	}, [])

	return (
		<ul className="filters">
			{filterButtons.map(filterButton => (
				<li key={filterButton.id}>
					<button
						type="button"
						className={classNames({
							selected: activeFilter === filterButton.id
						})}
						onClick={() => setFilter(filterButton.id)}
					>
						{filterButton.title}
					</button>
				</li>
			))}
		</ul>
	)
}
