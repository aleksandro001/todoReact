import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TasksFilter from './TaskFilter';

export default class Footer extends Component {
  static defaultProps = {
    toDo: {},
    clearCompleted: () => {},
    filterValue: {},
    onFilterChange: {},
  };
  static propTypes = {
    toDo: PropTypes.number,
    clearCompleted: PropTypes.func,
    filterValue: PropTypes.string,
    onFilterChange: PropTypes.func,
  };
  render() {
    const { toDo, clearCompleted, filterValue, onFilterChange } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{toDo} items left</span>
        <TasksFilter filterValue={filterValue} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
