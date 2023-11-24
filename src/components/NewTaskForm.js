import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { nanoid } from 'nanoid';
export default class NewTaskForm extends Component {
  state = {
    task: '',
    min: '',
    sec: '',
  };
  static propTypes = {
    onItemAdded: PropTypes.func,
  };
  textInput = React.createRef();
  focusTextInput = () => {
    setTimeout(() => this.textInput.current.focus());
  };
  onLabelChange = (e) => {
    this.setState({
      task: e.target.value,
    });
  };
  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };
  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };
  onSubmit = (e) => {
    const time = +this.state.min * 60 + +this.state.sec;
    if (isNaN(time)) {
      this.props.onItemAdded(this.state.task, 1800);
    } else {
      this.props.onItemAdded(this.state.task, time);
    }
    this.setState({
      task: '',
      min: '',
      sec: '',
    });
    this.focusTextInput();
    e.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input type="submit" className="input-submit" />
        <input
          ref={this.textInput}
          className="new-todo"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          value={this.state.task}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          min={0}
          value={this.state.min}
          placeholder="Min"
          onChange={this.onMinChange}
        />
        <input
          className="new-todo-form__timer"
          min={0}
          value={this.state.sec}
          placeholder="Sec"
          onChange={this.onSecChange}
        />
      </form>
    );
  }
}
