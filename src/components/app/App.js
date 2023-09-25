import React, {Component}   from "react";
import './app.css';
import { formatDistanceToNow } from 'date-fns';
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";
import {ru} from "date-fns/locale";



export default class App extends Component {

    // constructor() {
    //     super();
    //     this.handleFilterValueChange = this.handleFilterValueChange.bind(this)
    // }

    maxId = 100;
    TaskFilterValue = {
        ALL: 'ALL',
        ACTIVE: 'ACTIVE',
        COMPLETED: 'COMPLETED',
    };
state = {
    filterValue: this.TaskFilterValue.ALL,
    tasks: [
        this.createTask('Completed task'),
        this.createTask('Editing task'),
        this.createTask('Active task'),
    ],
}
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

    clearCompleted = () => {
    const newTasks = this.state.tasks.filter((task) => !task.completed)
        this.setState(({tasks}) => {
            return {tasks: newTasks}
        })
    }
    handleFilterValueChange(filterValue) {
    console.log('Click Active')// this problem!!!!!
        this.setState(() => {
            return { filterValue: filterValue };
        });
    }

    render() {
        const { tasks, filterValue} = this.state
        const todoCount = tasks.filter((el) => !el.completed).length

        // console.log(filterValue)
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm
                    onItemAdded={this.addTask}/>
                </header>
                <section className="main">
                    <TaskList todos={this.getFilteredTasks()}
                              onDeleted={this.deleteItem}
                              onToggleDone={this.onToggleDone}/>
                    <Footer toDo={todoCount}
                            filterValue={filterValue}
                            onFilterChange={this.handleFilterValueChange}
                            clearCompleted={this.clearCompleted}/>
                </section>
            </section>
        )
    }

}


