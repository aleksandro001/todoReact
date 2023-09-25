import React, {Component}  from "react";
import {fi} from "date-fns/locale";

export default class TasksFilter extends Component {
    render(){
const {onFilterChange, filterValue} = this.props

        return (<ul className="filters">
            <li>
                <button
                    className={ filterValue === 'ALL' ? 'selected': ''}
                    onClick={() => onFilterChange('ALL')}
                >All</button>
            </li>
            <li>
                <button
                    className={ filterValue === 'ACTIVE' ? 'selected': ''}
                    onClick={() => onFilterChange('ACTIVE')}
                >Active</button>
            </li>
            <li>
                <button
                    className={ filterValue === 'COMPLETED' ? 'selected': ''}
                    onClick={() => onFilterChange('COMPLETED')}
                >Completed</button>
            </li>
        </ul>)
    }
}

