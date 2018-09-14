import { Map } from 'immutable';
import React from 'react';
import { connect } from 'react-redux';
import { arrayContains } from '../utils';
import { lastElement } from '../utils';

const Word = ({ word, position, paraIndex, wordIndex, errorPositions }) => {
  const wordClassName = paraIndex === position.paragraph && wordIndex === position.word ? 'current-word' : null;
  const charClassName = (c) => (wordClassName && (c === position.char) ? 'char--current' : '');
  const errorClass = (c) => {
    const needle = Map({ paragraph: paraIndex, char: c, word: wordIndex });
    return errorPositions.has(needle) ? 'char--error' : '';
  };

  return(<span className={ wordClassName }>
    {
      word.split('').map((char, i) => (
        <span key={i} className={ `${charClassName(i)} ${errorClass(i)}` }>
          { char }
        </span>
      ))
    }
  </span>
  )
};

const mapStateToProps = (state) => ({
  position: lastElement(state.positions),
  errorPositions: state.errors,
});

export default connect(
  mapStateToProps,
)(Word);
