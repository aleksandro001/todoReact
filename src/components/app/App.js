import React, { Component } from 'react';
import './app.css';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default class App extends Component {
  maxId = 100;
  TaskFilterValue = {
    ALL: 'ALL',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
  };
  state = {
    filterValue: this.TaskFilterValue.ALL,
    tasks: [this.createTask('Completed task'), this.createTask('Editing task'), this.createTask('Active task')],
  };
  getFilteredTasks() {
    switch (this.state.filterValue) {
      case this.TaskFilterValue.ACTIVE:
        return this.state.tasks.filter((task) => !task.completed);
      case this.TaskFilterValue.COMPLETED:
        return this.state.tasks.filter((task) => task.completed);
      default:
        return this.state.tasks;
    }
  }

  createTask(task, time = 1800) {
    return {
      task,
      id: this.maxId++,
      completed: false,
      editing: false,
      createDate: new Date(),
      timer: { s: time },
      stopwatch: false,
      onPlay: true,
      interval: () => {},
    };
  }
  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const oldTask = tasks[idx];
      clearInterval(oldTask.interval);
      const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];
      return {
        tasks: newArray,
      };
    });
  };
  addTask = (text, time) => {
    const newTask = this.createTask(text, time);
    if (time === 0) {
      newTask.stopwatch = true;
    }
    this.setState(({ tasks }) => {
      const newArr = [...tasks, newTask];
      return { tasks: newArr };
    });
  };
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldTask = arr[idx];
    const newTask = { ...oldTask, [propName]: !oldTask[propName] };
    return [...arr.slice(0, idx), newTask, ...arr.slice(idx + 1)];
  }
  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const oldTask = tasks[idx];
      clearInterval(oldTask.interval);
      return {
        tasks: this.toggleProperty(tasks, id, 'completed'),
      };
    });
    const idx = this.state.tasks.findIndex((el) => el.id === id);
    const oldTask = this.state.tasks[idx];
    if (!oldTask.onPlay) {
      this.setState(({ tasks }) => {
        return {
          tasks: this.toggleProperty(tasks, id, 'onPlay'),
        };
      });
    }
  };

  clearCompleted = () => {
    const newTasks = this.state.tasks.filter((task) => !task.completed);
    this.setState(() => {
      return { tasks: newTasks };
    });
  };
  onEditing = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.toggleProperty(tasks, id, 'editing'),
      };
    });
  };
  onTaskChange = (e, id) => {
    if (e.code === 'Enter') {
      this.setState(({ tasks }) => {
        const idx = tasks.findIndex((el) => el.id === id);
        const oldTask = tasks[idx];
        const newTask = { ...oldTask, task: e.target.value };
        return { tasks: [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)] };
      });
      this.setState(({ tasks }) => {
        return {
          tasks: this.toggleProperty(tasks, id, 'editing'),
        };
      });
    } else if (e.code === 'Escape') {
      e.target.value = e.target.defaultValue;
      this.setState(({ tasks }) => {
        return {
          tasks: this.toggleProperty(tasks, id, 'editing'),
        };
      });
    }
  };
  handleFilterValueChange = (filterValue) => {
    this.setState(() => {
      return { filterValue: filterValue };
    });
  };
  Play = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.toggleProperty(tasks, id, 'onPlay'),
      };
    });
    const idx = this.state.tasks.findIndex((el) => el.id === id);
    const oldTask = this.state.tasks[idx];
    if (oldTask.completed) {
      this.setState(({ tasks }) => {
        return {
          tasks: this.toggleProperty(tasks, id, 'completed'),
        };
      });
    }
    if (oldTask.onPlay) {
      this.setState(({ tasks }) => {
        const idx = tasks.findIndex((el) => el.id === id);
        const oldTask = tasks[idx];
        if (oldTask.stopwatch) {
          const newTask = { ...oldTask, interval: setInterval(() => this.secPlay(id), 1000) };
          return { tasks: [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)] };
        } else {
          const newTask = { ...oldTask, interval: setInterval(() => this.timerPlay(id), 1000) };
          return { tasks: [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)] };
        }
      });
    } else {
      this.setState(({ tasks }) => {
        const idx = tasks.findIndex((el) => el.id === id);
        const oldTask = tasks[idx];
        clearInterval(oldTask.interval);
      });
      clearInterval(this.interval);
    }
  };
  timerPlay = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const oldTask = tasks[idx];
      if (oldTask.timer.s === 0) {
        clearInterval(oldTask.interval);
        const newTask = { ...oldTask, onPlay: true, interval: () => {}, completed: true };
        return { tasks: [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)] };
      }
      const newTask = { ...oldTask, timer: { s: oldTask.timer.s - 1 } };
      return { tasks: [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)] };
    });
  };
  secPlay = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const oldTask = tasks[idx];
      const newTask = { ...oldTask, timer: { s: oldTask.timer.s + 1 } };
      return { tasks: [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)] };
    });
  };
  render() {
    const { tasks, filterValue } = this.state;
    const todoCount = tasks.filter((el) => !el.completed).length;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            onTaskChange={this.onTaskChange}
            onEditing={this.onEditing}
            todos={this.getFilteredTasks()}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            Play={this.Play}
          />
          <Footer
            toDo={todoCount}
            filterValue={filterValue}
            onFilterChange={this.handleFilterValueChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
