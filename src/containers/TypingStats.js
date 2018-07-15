import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTypingStats } from '../actions';

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
    clearInterval(this._loop);
    /* window.cancelAnimationFrame(this._loop); */
  }

  render() {
    const numberOfCharsinAWord = 5;
    const { startedTypingAt, charsTyped, currentTime } = this.props;
    const minutesSinceTyping = (currentTime - startedTypingAt)/(60*1000);
    const cpm = minutesSinceTyping ? Math.round(charsTyped / minutesSinceTyping, 2) : 0;
    const wpm = Math.round(cpm/numberOfCharsinAWord, 2);

    return (<div>
      <p>
        Chars typed: { charsTyped }
      </p>
      <p>
        CPM: { cpm }
      </p>
      <p>
        WPM: { wpm }
      </p>
    </div>);
  }
}

const mapStateToProps = state => ({
  startedTypingAt: state.startedTypingAt,
  charsTyped: state.currentPosition,
  currentTime: state.currentTime,
});

export default connect(
  mapStateToProps,
  { updateTypingStats }
)(TypingStats);
