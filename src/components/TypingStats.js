import React, { Component } from 'react';
import TypingStatsBar from './TypingStatsBar.js';
import { connect } from 'react-redux';
import { updateTypingStats } from '../actions';
import {
  sum,
  roundTo2Dp,
  minutesSinceTyping,
  charsPerMin,
  wordsPerMin,
} from '../utils.js';

class TypingStats extends Component {
  componentDidMount() {
    this.startLoop();
  }

  componentWillUnmount() {
    this.stopLoop();
  }

  startLoop() {
    if (!this._loop) {
      this._loop = setInterval(this.loop.bind(this), 2000);
    }
  }

  loop() {
    this.props.updateTypingStats();
  }

  stopLoop() {
    clearInterval(this._loop);
  }

  stats () {
    const {
      charsToType,
      timeElapsed,
      numberOfErrors,
      wpm,
      cpm
    } = this.props;

    return [
      {
        stat: wpm,
        text: 'WPM'
      },
      {
        stat: cpm,
        text: 'CPM'
      },
      {
        stat: timeElapsed || 0,
        text: 's elapsed'
      },
      {
        stat: charsToType,
        text: 'chars to type'
      },
      {
        stat: numberOfErrors,
        text: 'errors',
      }
    ]
  }

  render() {
    if (this.props.typingFinished) this.stopLoop();

    return (
      <TypingStatsBar stats={this.stats()} />
    );
  }
}

const mapStateToProps = (
  {
    position,
    numberOfErrors,
    text,
    startedTypingAt,
    currentTime,
    typingFinished
  }
) => {
  const timeElapsed = (currentTime - startedTypingAt)/1000;
  const charsTyped = sum(text.slice(0, position.paragraph).map(x => x.length)) + sum(text[position.paragraph].slice(0, position.word).map(x => x.length)) + position.char;
  const cpm = charsPerMin(charsTyped, timeElapsed);
  const wpm = wordsPerMin(cpm);
  const typeableChars = sum(text.map(words => sum(words.map(word => word.length)) ));
  const charsToType =  typeableChars - charsTyped;

  return {
    charsToType,
    timeElapsed,
    typingFinished,
    numberOfErrors,
    wpm,
    cpm,
  }
};

export default connect(
  mapStateToProps,
  { updateTypingStats }
)(TypingStats);
