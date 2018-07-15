import React, { Component } from 'react';
import styled from 'styled-components';
import Text from './containers/Text';
import TypingStats from './containers/TypingStats';
import { connect } from 'react-redux';

const StyledApp = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-content: center;
  line-height: 2em;
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
