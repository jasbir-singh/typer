import React, { Component } from 'react';
import TypingStatsBar from './TypingStatsBar.js';
import { connect } from 'react-redux';
import { updateTypingStats } from '../actions';
import { getPosition, getWordToType } from '../stateTransformers';

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
    if (this.props.typingFinishedAt) this.stopLoop();

    return (
      <TypingStatsBar stats={this.stats()} />
    );
  }
}

const mapStateToProps = (state) => {
  const { time, text } = state;
  const { current, startedAt, finishedAt } = time;

  const position = getPosition(state);
  const timeElapsed = ((finishedAt || current) - startedAt)/1000;
  const charsTyped = sum(text.slice(0, position.paragraph).map(x => x.length)) + sum(text[position.paragraph].slice(0, position.word).map(x => x.length)) + position.char;
  const cpm = charsPerMin(charsTyped, timeElapsed);
  const wpm = wordsPerMin(cpm);
  const typeableChars = sum(text.map(words => sum(words.map(word => word.length)) ));
  const charsToType =  typeableChars - charsTyped;


  console.log(`numberOfErrors ${state.errors.length}`);

  return {
    charsToType,
    timeElapsed,
    typingFinishedAt: state.time.finishedAt,
    numberOfErrors: state.errors.size,
    wpm,
    cpm,
  }
};

export default connect(
  mapStateToProps,
  { updateTypingStats }
)(TypingStats);
