import React, {Component} from "react";
import PropTypes from 'prop-types';
export default class NewTaskForm extends Component {
    state = {
        task: ''
    }

    onLabelChange = (e) => {
        this.setState({
            task: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        this.props.onItemAdded(this.state.task)
        this.setState({
            task: ''
        })
    }
    render() {
        return (
            <form
                onSubmit={this.onSubmit}
            >
                <input
                className="new-todo"
                onChange={this.onLabelChange}
                placeholder="What needs to be done?"
                value={this.state.task}
                autoFocus/>
            </form>

        )
    }
}
NewTaskForm.propTypes = {
    onItemAdded: PropTypes.func,
}