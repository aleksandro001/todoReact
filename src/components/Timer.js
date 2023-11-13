import React, { Component } from 'react';

export default class Timer extends Component {
  render() {
    const { Play, onPlay, timer } = this.props;
    const seconds = timer.s % 60;
    const minutes = Math.floor(timer.s / 60);
    const minutesForm = Math.trunc(minutes / 10) === 0 ? `0${minutes}` : minutes;
    const onPlayClick = onPlay ? (
      <button className="icon icon-play" onClick={Play}></button>
    ) : (
      <button className="icon icon-pause" onClick={Play}></button>
    );
    return (
      <span className="description">
        {onPlayClick}
        <span>
          {minutesForm}:{seconds.toString().padStart(2, '0')}
        </span>
      </span>
    );
  }
}
