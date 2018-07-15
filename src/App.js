import React, { Component } from 'react';
import styled from 'styled-components';
import Text from './Text';
import TypingStats from './TypingStats';
import { connect } from 'react-redux';

const StyledApp = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  width: 50%
`;

class App extends Component {
  typingSummary() {
    return (<TypingStats />);
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
    return (
      <StyledApp className="App container">
        { typingFinished ? this.typingSummary() :  this.currentlyTyping() }
      </StyledApp>
    );
  }
}

const mapStateToProps = (state) => ({ typingFinished: state.typingFinshed });

export default connect(
  mapStateToProps,
)(App);
