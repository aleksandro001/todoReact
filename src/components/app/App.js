import React, { useEffect, useState } from 'react';
import './app.css';
import { nanoid } from 'nanoid';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default function App() {
  // let maxId = () => nanoid(12);
  const TaskFilterValue = {
    ALL: 'ALL',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
  };
  const createTask = (task, time = 1800) => {
    return {
      task,
      id: nanoid(12),
      completed: false,
      editing: false,
      createDate: new Date(),
      timer: { s: time },
      stopwatch: false,
      onPlay: true,
      interval: () => {},
      startTime: '',
      pointerEvents: true,
    };
  };
  const [filterValue, setFilterValue] = useState(TaskFilterValue.ALL);
  const [tasks, setTasks] = useState([
    createTask('Completed task'),
    createTask('Editing task'),
    createTask('Active task'),
  ]);

  function getFilteredTasks() {
    switch (filterValue) {
      case TaskFilterValue.ACTIVE:
        return tasks.filter((task) => !task.completed);
      case TaskFilterValue.COMPLETED:
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }

  const deleteItem = (id) => {
    const idx = tasks.findIndex((el) => el.id === id);
    const oldTask = tasks[idx];
    clearInterval(oldTask.interval);
    const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];
    setTasks(newArray);
  };
  const addTask = (text, time) => {
    const newTask = createTask(text, time);
    if (time === 0) {
      newTask.stopwatch = true;
    }
    const newArr = [...tasks, newTask];
    setTasks(newArr);
  };
  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldTask = arr[idx];
    const newTask = { ...oldTask, [propName]: !oldTask[propName] };
    return [...arr.slice(0, idx), newTask, ...arr.slice(idx + 1)];
  };
  const onToggleDone = (id) => {
    const idx = tasks.findIndex((el) => el.id === id);
    const oldTask = tasks[idx];
    clearInterval(oldTask.interval);
    setTasks((tasks) => toggleProperty(tasks, id, 'completed'));
    setTasks((tasks) => toggleProperty(tasks, id, 'pointerEvents'));
    if (!oldTask.onPlay) {
      setTasks((tasks) => toggleProperty(tasks, id, 'onPlay'));
    }
  };

  const clearCompleted = () => {
    const newTasks = tasks.filter((task) => !task.completed);
    setTasks(newTasks);
  };
  const onEditing = (id) => {
    setTasks((tasks) => toggleProperty(tasks, id, 'editing'));
  };
  const onTaskChange = (e, id) => {
    if (e.code === 'Enter') {
      const idx = tasks.findIndex((el) => el.id === id);
      const oldTask = tasks[idx];
      const newTask = { ...oldTask, task: e.target.value };
      setTasks([...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)]);
      setTasks((tasks) => toggleProperty(tasks, id, 'editing'));
    } else if (e.code === 'Escape') {
      e.target.value = e.target.defaultValue;
      setTasks((tasks) => toggleProperty(tasks, id, 'editing'));
    }
  };
  const handleFilterValueChange = (filterValue) => {
    setFilterValue(filterValue);
  };
  const Play = (id) => {
    setTasks((tasks) => toggleProperty(tasks, id, 'onPlay'));
    const idx = tasks.findIndex((el) => el.id === id);
    const oldTask = tasks[idx];
    // console.log(oldTask.completed);

    if (oldTask.completed) {
      setTasks((tasks) => toggleProperty(tasks, id, 'completed'));
    }

    if (oldTask.onPlay) {
      if (oldTask.stopwatch) {
        const newTask = { ...oldTask, interval: setInterval(() => secPlay(id), 1000) };
        setTasks([...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)]);
      } else {
        console.log(oldTask.stopwatch);
        const newTask = { ...oldTask, interval: setInterval(() => timerPlay(id), 1000) };
        setTasks([...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)]);
      }
    } else {
      clearInterval(oldTask.interval);
      const newTask = { ...oldTask, startTime: '' };
      setTasks([...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)]);
    }
  };
  const timerPlay = (id) => {
    const idx = tasks.findIndex((el) => el.id === id);
    const oldTask = tasks[idx];
    let count = 1000;
    const nowTime = Date.now();
    if (oldTask.timer.s === 0) {
      clearInterval(oldTask.interval);
      const newTask = { ...oldTask, onPlay: true, interval: () => {}, completed: true };
      setTasks((tasks) => [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)]);
    }
    if (oldTask.startTime) {
      count = nowTime - oldTask.startTime;
    }
    const newTask = { ...oldTask, timer: { s: oldTask.timer.s - Math.round(count / 1000) }, startTime: nowTime };
    setTasks([...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)]);
  };
  const secPlay = (id) => {
    console.log(tasks);
    const idx = tasks.findIndex((el) => el.id === id);
    const oldTask = tasks[idx];
    let count = 1000;
    const nowTime = Date.now();
    if (oldTask.startTime) {
      count = nowTime - oldTask.startTime;
    }
    const newTask = { ...oldTask, timer: { s: oldTask.timer.s + Math.round(count / 1000) }, startTime: nowTime };
    setTasks([...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)]);
  };
  useEffect(() => {
    return () => {
      window.addEventListener('unload', (tasks) => {
        const newTasks = tasks.map((el) => clearInterval(el.interval));
        setTasks(newTasks);
      });
    };
  }, [tasks]);
  const todoCount = tasks.filter((el) => !el.completed).length;
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addTask} />
      </header>
      <section className="main">
        <TaskList
          onTaskChange={onTaskChange}
          onEditing={onEditing}
          todos={getFilteredTasks()}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          Play={Play}
        />
        <Footer
          toDo={todoCount}
          filterValue={filterValue}
          onFilterChange={handleFilterValueChange}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
}
