import React, {Component} from "react";

export default class Task extends Component {

    state = {
        completed: false
    }

    onLabelClick = () => {
        this.setState(({completed}) => {
            return {
                completed: !completed
            }
        })
    }

    render() {
        const {onDeleted, name} = this.props
        const {completed} = this.state
        let classNames = ''
        if(completed) classNames = 'completed'
        return (<li className={classNames}>
            <div className="view">
                <input className="toggle" type="checkbox"/>
                <label>
                    <span
                        className="description"
                        onClick={this.onLabelClick}
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
