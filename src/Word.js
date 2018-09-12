import React from 'react';
import { connect } from 'react-redux';

const Word = ({ word, position, paraIndex, wordIndex }) => {
  const wordClassName = paraIndex === position.paragraph && wordIndex === position.word ? 'current-word' : null;
  const charClassName = (c) => (wordClassName && (c === position.char) ? 'char--current' : '');
  return(<span className={ wordClassName }>
    {
      word.split('').map((char, i) => (
        <span key={i} className={ charClassName(i) }>
          { char }
        </span>
      ))
    }
  </span>
  )
};

const mapStateToProps = (state) => ({
  position: state.position
});

export default connect(
  mapStateToProps,
)(Word);
