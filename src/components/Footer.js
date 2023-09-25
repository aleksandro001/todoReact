import React, {Component} from "react";
import TasksFilter from "./TaskFilter";

export default class Footer extends Component {

    render() {
    const {toDo,  clearCompleted, filterValue, onFilterChange} = this.props
        return (<footer className="footer">
            <span className="todo-count">{toDo} items left</span>
            <TasksFilter
                filterValue={filterValue}
                onFilterChange={onFilterChange}
            />
            <button className="clear-completed"
            onClick={clearCompleted}
            >Clear completed</button>
        </footer>)
    }
}
