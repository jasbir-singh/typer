import React from 'react';
import styled from 'styled-components';

const StyledParagraph = styled.div`
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

const Paragraph = ({ text, currentPosition, currentPara, errorPosition, paraIndex }) => {
  const charToClass = (index) => {
    if ((index === currentPosition) && currentPara === paraIndex) {
      return 'char--current';
    } else if ((paraIndex < currentPara) || ((paraIndex === currentPara) && (index < currentPosition))) {
      return 'char--correctly-typed'
    } else {
      return '';
    };
  };

  const errorToClass = (index) => {
    if ((errorPosition === index) && (currentPara === paraIndex)) {
      return 'char--error';
    } else {
      return '';
    };
  };

  return (
    <StyledParagraph>
      {
        text
          .split('')
          .map(
            (char, j) => (
              <span
                key={j}
                className={`index-${j} ${charToClass(j)} ${errorToClass(j)}`}>
                { char }
              </span>
            )
          )
      }
    </StyledParagraph>
  );
};

export default Paragraph;