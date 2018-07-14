import React from 'react';

const Paragraph = ({ text, currentPosition, currentPara, errorPosition }) => {
  const charToClass = (index) => {
    if ((index === currentPosition) && currentPara) {
      return 'current-char';
    } else {
      return '';
    };
  };

  const errorToClass = (index) => {
    if ((errorPosition === index) && currentPara) {
      return 'error';
    } else {
      return '';
    };
  };

  return (
      <div>
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
    </div>
  );
};

export default Paragraph;
