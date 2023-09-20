import React, {Component}   from "react";
import './app.css';
import { formatDistanceToNow } from 'date-fns';
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";


export default class App extends Component {
state = {
    tasks: [
        {task: 'Completed task', id: 0},
        {task: 'Editing task', id: 1},
        {task: 'Active task', id: 2},
    ]
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
render() {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm />
                </header>
                <section className="main">
                    <TaskList todos={this.state.tasks}
                              onDeleted={this.deleteItem}/>
                    <Footer />
                </section>
            </section>
        )
    }

}


