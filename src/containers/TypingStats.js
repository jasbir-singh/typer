import React from 'react';
import { connect } from 'react-redux';

const TypingStats = ({ charsTyped }) => (
  <div>
    <p>
      CPM: { charsTyped }
    </p>
  </div>
)

const mapStateToProps = state => ({
  cpm: state.cpm,
});

export default connect(
  mapStateToProps,
)(TypingStats);
