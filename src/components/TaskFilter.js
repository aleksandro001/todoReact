import React, {Component}  from "react";

export default class TasksFilter extends Component {

    render() {
        const {filterAll, filterActive, filterCompleted} = this.props
        // const onClickAll = () => {
        //     console.log(filterAll)
        // }
        return (<ul className="filters">
            <li>
                <button className="selected"
                onClick={filterAll}>All</button>
            </li>
            <li>
                <button
                onClick={filterActive}>Active</button>
            </li>
            <li>
                <button
                onClick={filterCompleted}>Completed</button>
            </li>
        </ul>)
    }
}

