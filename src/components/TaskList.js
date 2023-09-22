import React, {Component} from "react";
import Task from "./Task";

export default class TaskList extends Component {

    render() {
    const{onDeleted, todos, onToggleDone}= this.props;
        const elements = todos.map((item) => {
            const {id, completed, task} = item;
            return <Task
                task={task}
                key={id}
                completed={completed}
                onDeleted={() => onDeleted(id)}
                onToggleDone={() => onToggleDone(id)}
            />
        })

        return (
            <ul className="todo-list">
            {elements}
            </ul>
        )
    }
}
