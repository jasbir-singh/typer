import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosition, getWordToType } from '../stateTransformers';

const InputBox = ({ wordToType, position }) => (
  <div className="input-group input-group-lg m-2">
    <input type="text" placeholder={wordToType.slice(0, position.char)} className="form-control" />
  </div>
);

const mapStateToProps = (state) => {
  const position = getPosition(state);
  const wordToType = getWordToType(state);

  return {
    wordToType,
    position
  }
};

export default connect(
  mapStateToProps,
)(InputBox);
