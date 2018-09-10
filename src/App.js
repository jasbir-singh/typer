import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import TextWithSpinner from './TextWithSpinner';
import TypingStats from './TypingStats';
import WikipediaButton from './WikipediaButton';

const StyledApp = styled.div`
  height: 100%;
  padding: 0;
  margin: 0;
  padding: 5% 20% ;

  display: flex;
  align-items: center;
  justify-content: center;
`;

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
        <div>
          <TextWithSpinner />
          <WPM />
        </div>
        <TypingStats />
        <WikipediaButton />
      </div>
    )
  }

  render() {
    const { typingFinished } = this.props;
    console.log(`Typing finished ${typingFinished}`);
    return (
      <StyledApp className="App flex-container">
          { typingFinished ? this.typingSummary() :  this.currentlyTyping() }
      </StyledApp>
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
