import React, {Component}  from "react";

export default class TasksFilter extends Component {


    render() {
        const {onFilterChange, filterValue} = this.props

        const active = () => {
            onFilterChange('ACTIVE')
        }
        return (<ul className="filters">
            <li>
                <button className="selected"
                >All</button>
            </li>
            <li>
                <button
                    onClick={active}
                >Active</button>
            </li>
            <li>
                <button
                >Completed</button>
            </li>
        </ul>)
    }
}

