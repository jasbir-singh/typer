import React, { Component } from 'react';
import styled from 'styled-components';
import Text from './Text';
import TypingStats from './TypingStats';
import { connect } from 'react-redux';

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
      <div>
        <Text />
        <TypingStats />
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

const mapStateToProps = (state) => ({ typingFinished: state.typingFinished });

export default connect(
  mapStateToProps,
)(App);
