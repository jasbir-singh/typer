import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchRandomArticle,
} from './actions';

const WikipediaButton = ({ fetchRandomArticle }) => {
  return (
      <button onClick={fetchRandomArticle}>Fetch random Wiki Article</button>
  );
};

const mapDispatchToProps = {
  fetchRandomArticle,
};

export default connect(
  null,
  mapDispatchToProps,
)(WikipediaButton);
