import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTypingStats } from './actions';
import { sum, roundTo2Dp } from './utils.js';

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
      /* this._loop = window.requestAnimationFrame(this.loop.bind(this)); */
    }
  }

  loop() {
    this.props.updateTypingStats();
    /* this._loop = window.requestAnimationFrame(this.loop.bind(this)) */
  }

  stopLoop() {
    console.log('Stop loop');
    clearInterval(this._loop);
    /* window.cancelAnimationFrame(this._loop); */
  }

  render() {
    if (this.props.typingFinished) this.stopLoop();

    return (
      <TypingStatsBar {...this.props} />
    );
  }
}

const numberOfCharsinAWord = 5;
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
  const minutesSinceTyping = (timeElapsed/60) || 0;
  const charsTyped = sum(text.slice(0, currentPara).map(x => x.length)) + currentPosition;
  const cpm = charsTyped && minutesSinceTyping ? Math.round(charsTyped / minutesSinceTyping, 2) : 0;
  const wpm = Math.round(cpm/numberOfCharsinAWord, 2);
  const typeableChars = sum(text.map(x => x.length));
  const charsToType =  typeableChars - charsTyped;

  return {
    charsToType,
    timeElapsed,
    numberOfErrors,
    wpm,
    cpm,
  }
};

export default connect(
  mapStateToProps,
  { updateTypingStats }
)(TypingStats);
