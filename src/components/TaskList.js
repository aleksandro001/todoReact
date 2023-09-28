import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

export default class TaskList extends Component {
  static defaultProps = {
    onDeleted: () => {},
    todos: [],
    onToggleDone: () => {},
  };
  static propTypes = {
    todos: (props, todos, TaskList) => {
      const value = props[todos];
      if (Array.isArray(value)) {
        return null;
      }
      return new TypeError(`${TaskList}: ${todos} must be array`);
    },
    key: PropTypes.number,
    completed: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
  };
  render() {
    const { onDeleted, todos, onToggleDone } = this.props;

    const elements = todos.map((item) => {
      const { id, completed, task, createDate } = item;
      return (
        <Task
          task={task}
          key={id}
          completed={completed}
          createDate={createDate}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
