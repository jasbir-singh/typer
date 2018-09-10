import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import TextWithSpinner from './TextWithSpinner';
import TypingStats from './TypingStats';
import WikipediaButton from './WikipediaButton';

class App extends Component {
  typingSummary() {
    return (
      <div>
        <p>Summary Statistics</p>
        <TypingStats />
      </div>
    );
  }

  currentlyTyping() {
    return (
      <div className="container">
        <div className="border p-5">
          <TypingStats />
          <TextWithSpinner />
          <WikipediaButton />
        </div>
        {/* <TypingStats /> */}
      </div>
    )
  }

  render() {
    const { typingFinished } = this.props;
    console.log(`Typing finished ${typingFinished}`);
    return (
      <div className="App flex-container">
          { typingFinished ? this.typingSummary() :  this.currentlyTyping() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  typingFinished: state.typingFinished,
  loading: state.loading
});

export default connect(
  mapStateToProps,
)(App);
