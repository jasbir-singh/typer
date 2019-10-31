import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextWithSpinner from './TextWithSpinner';
import TypingStats from './TypingStats';
import WikipediaButton from './WikipediaButton';

class App extends Component {
  typingSummary() {
    return (
      <div>
        <h1>Summary Statistics</h1>
        <TypingStats />
        <WikipediaButton />
      </div>
    );
  }

  currentlyTyping() {
    const { loading } = this.props;

    return (
      <div>
        <TypingStats />
        <TextWithSpinner loading={loading} />
        <WikipediaButton />
      </div>
    );
  }

  render() {
    const { typingFinished } = this.props;
    return (
      <div className="container-fluid">
        <div className="p-2">
          { typingFinished ? this.typingSummary() :  this.currentlyTyping() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  typingFinished: state.typingFinished,
  loading: state.loading
});

export default connect(
  mapStateToProps,
)(App);
