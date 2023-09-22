import React, {Component} from "react";
import TasksFilter from "./TaskFilter";

export default class Footer extends Component {

    render() {
    const {toDo, filterAll, clearCompleted,filterActive,filterCompleted} = this.props
        return (<footer className="footer">
            <span className="todo-count">{toDo} items left</span>
            <TasksFilter
            filterAll={filterAll}
            filterActive={filterActive}
            filterCompleted={filterCompleted}/>
            <button className="clear-completed"
            onClick={clearCompleted}
            >Clear completed</button>
        </footer>)
    }
}
