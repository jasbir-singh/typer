import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTypingStats } from './actions';
import styled from 'styled-components';

const CurrentlyTypedStats = ({
  typeableChars,
  charsTyped,
  minutesSinceTyping,
  numberOfErrors,
  wpm,
  cpm,
}) => (
  <StyledTypingStats>
    <p>
      Chars to type: { typeableChars - charsTyped }
    </p>
    <p>
      Chars incorrectly typed: { numberOfErrors }
    </p>
    <p>
      Chars typed: { charsTyped }
    </p>
    <p>
      CPM: { cpm }
    </p>
    <p>
      WPM: { wpm }
    </p>
    <p>
      Elapsed Time (in mins): { roundTo2Dp(minutesSinceTyping) }
    </p>
  </StyledTypingStats>
)

const StyledTypingStats = styled.div`
  p {
  margin-bottom: 0;
  margin-top: 0;
  line-height: 1em;
  }
`;

class TypingStats extends Component {
  componentDidMount() {
    this.startLoop();
  }

  componentWillUnmount() {
    this.stopLoop();
  }

  startLoop() {
    if (!this._loop) {
      this._loop = setInterval(this.loop.bind(this), 500);
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
      <CurrentlyTypedStats {...this.props} />
    );
  }
}

const numberOfCharsinAWord = 5;
const sum = (arr) => arr.reduce((a, b) => a + b, 0);
const roundTo2Dp = (num) => Math.round(num, 2);

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
  const minutesSinceTyping = ((currentTime - startedTypingAt)/(60*1000)) || 0;
  const charsTyped = sum(text.slice(0, currentPara).map(x => x.length)) + currentPosition;
  const cpm = charsTyped && minutesSinceTyping ? Math.round(charsTyped / minutesSinceTyping, 2) : 0;
  const wpm = Math.round(cpm/numberOfCharsinAWord, 2);
  const typeableChars = sum(text.map(x => x.length));

  return {
    typeableChars,
    typingFinished,
    charsTyped,
    minutesSinceTyping,
    numberOfErrors,
    wpm,
    cpm,
  }
};

export default connect(
  mapStateToProps,
  { updateTypingStats }
)(TypingStats);
