import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  fetchRandomArticle,
} from './actions';

const StyledWikipediaButton = styled.div`
  margin: 10% 0;
`;

const WikipediaButton = ({ fetchRandomArticle }) => {
  return (
    <StyledWikipediaButton>
      <button onClick={fetchRandomArticle}>Fetch random Wiki Article</button>
    </StyledWikipediaButton>
  );
};

const mapDispatchToProps = {
  fetchRandomArticle,
};

export default connect(
  null,
  mapDispatchToProps,
)(WikipediaButton);
