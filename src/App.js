import React, { Component } from 'react';
import styled from 'styled-components';
import Text from './containers/Text';
import TypingStats from './containers/TypingStats';

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
  render() {
    return (
      <StyledApp className="App container">
        <Text />
        <TypingStats />
      </StyledApp>
    );
  }
}

export default App;
