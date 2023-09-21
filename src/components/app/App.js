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

onToggleDone = (id) => {
    this.setState(({tasks}) => {
        const idx = tasks.findIndex((el) => el.id === id)
        const oldTask = tasks[idx]
        const newTask = {...oldTask, completed: !oldTask.completed}
        const newArray = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)]
        console.log (newTask);
        return {
            tasks: newArray
        }

    })
}
    render() {
        const { tasks} = this.state
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm />
                </header>
                <section className="main">
                    <TaskList todos={tasks}
                              onDeleted={this.deleteItem}
                              onToggleDone={this.onToggleDone}/>
                    <Footer />
                </section>
            </section>
        )
    }

}


