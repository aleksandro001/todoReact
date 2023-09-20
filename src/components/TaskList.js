import React, {Component} from "react";
import Task from "./Task";

export default class TaskList extends Component {

    render() {
    const{onDeleted, todos}= this.props;
        const elements = todos.map((item) => {
            const {id, ...tasks} = item;
            return <Task
                name={item.task}
                key={id}
                onDeleted={() => onDeleted(id)}
            />
        })

        return (
            <ul className="todo-list">
            {elements}
            </ul>
        )
    }
}
