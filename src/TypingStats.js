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

const TypingStatsBar = ({
  charsToType,
  timeElapsed,
  numberOfErrors,
  wpm,
  cpm,
}) => (
  <div className="d-flex align-content-center mt-4 mb-4">
    <div className="border flex-fill">
      <span style={{ fontSize: '3rem' }}>
        { wpm }
      </span>
      WPM
    </div>

    <div className="border flex-fill">
      <span style={{ fontSize: '3rem' }}>
        { cpm }
      </span>
      CPM
    </div>

    <div className="border flex-fill">
      <span style={{ fontSize: '3rem' }}>
        { timeElapsed || 0 }
      </span>
      s elapsed
    </div>

    <div className="border flex-fill">
      <span style={{ fontSize: '3rem' }}>
        { charsToType }
      </span>
      chars to type
    </div>

    <div className="border flex-fill">
      <span style={{ fontSize: '3rem' }}>
        { numberOfErrors }
      </span>
      errors
    </div>
  </div>
);

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
    console.log('Stop loop');
    clearInterval(this._loop);
  }

  render() {
    if (this.props.typingFinished) this.stopLoop();

    return (
      <TypingStatsBar {...this.props} />
    );
  }
}

const mapStateToProps = (
  {
    numberOfErrors,
    text,
    currentPara,
    startedTypingAt,
    currentPosition,
    currentTime,
    typingFinished
  }
) => {
  const timeElapsed = (currentTime - startedTypingAt)/1000;
  const charsTyped = sum(text.slice(0, currentPara).map(x => x.length)) + currentPosition;
  const cpm = charsPerMin(charsTyped, timeElapsed);
  const wpm = wordsPerMin(cpm);
  const typeableChars = sum(text.map(x => x.length));
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
