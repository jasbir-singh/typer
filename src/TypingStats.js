import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTypingStats } from './actions';
import {
  sum,
  roundTo2Dp,
  minutesSinceTyping,
  charsPerMin,
  wordsPerMin,
} from './utils.js';

const Stat = ({ stat, text }) => (
  <div className="border flex-fill text-center">
    <span style={{ fontSize: '3rem' }}>
      { stat }
    </span>
    { text }
  </div>
)

const TypingStatsBar = ({ stats }) => {
  return (
    <div className="d-flex align-content-center mt-4 mb-4">
      {
        stats.map((props, i) => <Stat key={i} {...props} />)
      }
    </div>
  );
};

class TypingStats extends Component {
  componentDidMount() {
    this.startLoop();
  }

  componentWillUnmount() {
    this.stopLoop();
  }

  startLoop() {
    if (!this._loop) {
      this._loop = setInterval(this.loop.bind(this), 800);
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
