import React from 'react';
import { connect } from 'react-redux';

import {
  fetchRandomArticle,
} from './actions';

const WikipediaButton = ({ fetchRandomArticle }) => {
  return (
    <p className="btn btn-primary" onClick={fetchRandomArticle}>Fetch random Wiki Article</p>
  );
};

const mapDispatchToProps = {
  fetchRandomArticle,
};

export default connect(
  null,
  mapDispatchToProps,
)(WikipediaButton);
