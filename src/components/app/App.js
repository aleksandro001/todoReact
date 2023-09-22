import React, {Component}   from "react";
import './app.css';
import { formatDistanceToNow } from 'date-fns';
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";


export default class App extends Component {
    maxId = 100;
state = {
    tasks: [
        this.createTask('Completed task'),
        this.createTask('Editing task'),
        this.createTask('Active task'),
    ]
}

createTask(task) {
    return {
        task,
        id: this.maxId++,
        completed: false,
    }
}
deleteItem = (id) => {
    this.setState(({tasks}) => {
        const idx = tasks.findIndex((el) => el.id === id)
        const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)]
        return {
            tasks: newArray
        }
    })
}
addTask = (text) => {
    const newTask = this.createTask(text)
    this.setState(({tasks}) => {
const newArr = [
    ...tasks,
    newTask
]
        return {tasks: newArr}
    })
}
toggleProperty(arr, id, propName){
    const idx = arr.findIndex((el) => el.id === id)
    const oldTask = arr[idx]
    const newTask = {...oldTask, [propName]: !oldTask[propName]}
    return [...arr.slice(0, idx), newTask, ...arr.slice(idx + 1)]
}
onToggleDone = (id) => {
    this.setState(({tasks}) => {
        return {
            tasks: this.toggleProperty(tasks, id, 'completed')
        }
    })
}
     onClickAll = () => {
        console.log('All')
    }
    clearCompleted = () => {
    const newTasks = this.state.tasks.filter((task) => !task.completed)
        this.setState(({tasks}) => {
            return {tasks: newTasks}
        })
    }
    filterActive = () => {
    console.log('Active')
    }
    filterCompleted = () => {
    console.log('Completed')
    }
    render() {
        const { tasks} = this.state
        const todoCount = tasks.filter((el) => !el.completed).length
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm
                    onItemAdded={this.addTask}/>
                </header>
                <section className="main">
                    <TaskList todos={tasks}
                              onDeleted={this.deleteItem}
                              onToggleDone={this.onToggleDone}/>
                    <Footer toDo={todoCount}
                            filterAll={this.onClickAll}
                            filterActive={this.filterActive}
                            filterCompleted={this.filterCompleted}
                            clearCompleted={this.clearCompleted}/>
                </section>
            </section>
        )
    }

}


