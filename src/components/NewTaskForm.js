import React, {Component} from "react";

export default class NewTaskForm extends Component {
    render() {
        return <input className="new-todo" placeholder="What needs to be done?" autoFocus/>
    }
}
