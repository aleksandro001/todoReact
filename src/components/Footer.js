import React, {Component} from "react";
import TasksFilter from "./TaskFilter";
import PropTypes from 'prop-types';

export default class Footer extends Component {
static defaultProps = {
    toDo: {},
    clearCompleted: () => {},
    filterValue: {},
    onFilterChange: {},
}
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

Footer.propTypes = {
    toDo: PropTypes.number,
    clearCompleted: PropTypes.func,
    filterValue: PropTypes.string,
    onFilterChange: PropTypes.func,
}