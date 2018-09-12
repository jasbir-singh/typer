import React from 'react';
import styled from 'styled-components';
import Word from './Word.js';

const StyledParagraph = styled.div`
  .current-word {
    background-color: blanchedalmond;
  }

  .char--current {
    text-decoration: underline;
    font-weight: bolder;
  };

  .char--correctly-typed {
    color: green;
  };

  .char--error {
    background-color: red;
    color: white;
  }
`;

const Paragraph = (props) => {
  const {  text, paraIndex } = props;

  return (
    <StyledParagraph className="pb-3">
      {
        text.map((word, i) => (<Word word={word} key={i} wordIndex={i} paraIndex={paraIndex} />))
      }
    </StyledParagraph>
  );
};

export default Paragraph;
