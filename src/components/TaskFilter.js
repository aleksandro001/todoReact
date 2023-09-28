import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  static defaultProps = {
    onFilterChange: () => {},
    filterValue: {},
  };
  static propTypes = {
    onFilterChange: PropTypes.func,
    filterValue: PropTypes.string,
  };
  render() {
    const { onFilterChange, filterValue } = this.props;

    return (
      <ul className="filters">
        <li>
          <button className={filterValue === 'ALL' ? 'selected' : ''} onClick={() => onFilterChange('ALL')}>
            All
          </button>
        </li>
        <li>
          <button className={filterValue === 'ACTIVE' ? 'selected' : ''} onClick={() => onFilterChange('ACTIVE')}>
            Active
          </button>
        </li>
        <li>
          <button className={filterValue === 'COMPLETED' ? 'selected' : ''} onClick={() => onFilterChange('COMPLETED')}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
