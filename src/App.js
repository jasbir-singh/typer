import React, { Component } from 'react';
import styled from 'styled-components';
import Text from './containers/Text';

const StyledApp = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Text />
      </div>
    );
  }
}

export default App;
