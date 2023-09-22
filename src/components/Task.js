import React, {Component} from "react";
import classNames from "classnames";
export default class Task extends Component {

    render() {
        const {onDeleted, task, completed,  onToggleDone} = this.props
        const itemClasses = classNames({
            completed: completed,
            // editing: this.state.editForm,
        })
        return (
            <li className={itemClasses}>
            <div className="view">
                <input className="toggle" type="checkbox" checked={completed} onChange={onToggleDone}/>
                <label>
                    <span
                        className="description"
                        onClick={onToggleDone}
                    >{task}</span>
                    <span className="created">created 5 minutes ago</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"
                        onClick={onDeleted}
                ></button>
            </div>
        </li>)
    }
}
