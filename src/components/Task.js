import React, { Component } from 'react';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
export default class Task extends Component {
  static defaultProps = {
    onDeleted: () => {},
    task: {},
    completed: false,
    onToggleDone: () => {},
    createDate: () => {},
  };
  render() {
    const { onDeleted, task, completed, onToggleDone, createDate } = this.props;
    const itemClasses = classNames({
      completed: completed,
    });
    const getFormattedDate = formatDistanceToNow(createDate, { addSuffix: true });

    return (
      <li className={itemClasses}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onToggleDone} />
          <label>
            <span className="description" onClick={onToggleDone}>
              {task}
            </span>
            <span className="created">{getFormattedDate}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
Task.propTypes = {
  onDeleted: PropTypes.func,
  task: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  completed: PropTypes.bool,
  onToggleDone: PropTypes.func,
  createDate: PropTypes.instanceOf(Date),
};
