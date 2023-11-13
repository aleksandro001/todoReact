import React, { Component } from 'react';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import Timer from './Timer';
export default class Task extends Component {
  static defaultProps = {
    onDeleted: () => {},
    task: {},
    completed: false,
    onToggleDone: () => {},
    createDate: () => {},
  };
  static propTypes = {
    onDeleted: PropTypes.func,
    task: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    completed: PropTypes.bool,
    onToggleDone: PropTypes.func,
    createDate: PropTypes.instanceOf(Date),
  };
  textInput = React.createRef();

  focusTextInput = () => {
    setTimeout(() => this.textInput.current.focus());
  };
  render() {
    const {
      onDeleted,
      task,
      completed,
      onToggleDone,
      editing,
      createDate,
      Play,
      onPlay,
      timer,
      onEditing,
      onTaskChange,
    } = this.props;
    const itemClasses = classNames({
      completed: completed,
      editing: editing,
    });
    const getFormattedDate = formatDistanceToNow(createDate, { addSuffix: true });

    return (
      <li className={itemClasses}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onToggleDone} />
          <div className="label">
            <span className="title" onClick={onToggleDone}>
              {task}
            </span>
            <Timer Play={Play} onPlay={onPlay} timer={timer} />
            <span className="description">{getFormattedDate}</span>
          </div>
          <button
            className="icon icon-edit"
            onClick={() => {
              this.focusTextInput();
              onEditing();
            }}
          ></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" ref={this.textInput} defaultValue={task} onKeyUp={onTaskChange} />
      </li>
    );
  }
}
