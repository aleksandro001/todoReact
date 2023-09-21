import React, {Component} from "react";
import classNames from "classnames";
export default class Task extends Component {

    render() {
        const {onDeleted, name, completed,  onToggleDone} = this.props
        // const itemClasses = classNames({
        //     completed: completed,
        //     // editing: this.state.editForm,
        // })
        let classNames =  ''
        if(completed) classNames = 'completed'
        console.log(completed)
        return (
            <li className={classNames}>
            <div className="view">
                <input className="toggle" type="checkbox" checked={completed} onChange={onToggleDone}/>
                <label>
                    <span
                        className="description"
                        onClick={onToggleDone}
                    >{name}</span>
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
