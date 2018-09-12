import React, { Component } from 'react';
import { connect } from 'react-redux';

const InputBox = ({ wordToType, position }) => (
  <div class="input-group input-group-lg m-2">
    <input type="text" placeholder={wordToType.slice(0, position.char)} class="form-control" />
  </div>
);

const mapStateToProps = ({ wordToType, position }) => ({
  wordToType, position
});

export default connect(
  mapStateToProps,
)(InputBox);
