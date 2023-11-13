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
    const { onDeleted, todos, onToggleDone, Play, onEditing, onTaskChange } = this.props;

    const elements = todos.map((item) => {
      const { id, completed, task, createDate, onPlay, timer, editing } = item;
      return (
        <Task
          onTaskChange={(e) => onTaskChange(e, id)}
          onEditing={() => onEditing(id)}
          timer={timer}
          Play={() => Play(id)}
          onPlay={onPlay}
          task={task}
          key={id}
          completed={completed}
          editing={editing}
          createDate={createDate}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
