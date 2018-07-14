import React, { Component } from 'react';
import styled from 'styled-components';
import Text from './containers/Text';

const StyledApp = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-content: center;
  line-height: 2em;
  flex-direction: column;
  width: 50%
`;

const TypingStats = ({ charsTyped }) => (
  <div>
    <p>
      Characters typed: {charsTyped}
    </p>
  </div>
)

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
