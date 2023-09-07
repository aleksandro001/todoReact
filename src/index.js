import React   from "react";
import ReactDOM from  'react-dom/client';
import './toDo.css';
import { formatDistanceToNow } from 'date-fns';

const root = ReactDOM.createRoot(document.getElementById('root'))

const Task = (props) => {
    return (<li>
        <div className="view">
            <input className="toggle" type="checkbox"/>
            <label>
                <span className="description">{props.name}</span>
                <span className="created">created 5 minutes ago</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"></button>
        </div>
    </li>)
}
const TaskList = () => {
    const completed = 'Completed task'
    const editing = 'Editing task'
    const active = 'Active task'
    return (<ul className="todo-list">
    <Task name={completed}/>
    <Task name={editing}/>
    <Task name={active}/>
</ul>)
}
const NewTaskForm = () => {
    return <input className="new-todo" placeholder="What needs to be done?" autoFocus/>
}
const Footer = () => {
    return (<footer className="footer">
    <span className="todo-count">1 items left</span>
    <TasksFilter/>
    <button className="clear-completed">Clear completed</button>
</footer>)
}
const TasksFilter = () => {
    return (<ul className="filters">
    <li>
        <button className="selected">All</button>
    </li>
    <li>
        <button>Active</button>
    </li>
    <li>
        <button>Completed</button>
    </li>
</ul>)
}

const el = (
<section className="todoapp">
    <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
    </header>
    <section className="main">
        <TaskList />
        <Footer/>
    </section>
</section>

)

const distanceTime = formatDistanceToNow(new Date(), { addSuffix: true })
console.log(distanceTime)

root.render(el)
