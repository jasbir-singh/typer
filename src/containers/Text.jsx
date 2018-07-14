import { connect } from 'react-redux';
import React, { Component } from 'react';
import './Text.css';
import { handleOnKeyPress  } from '../actions';
import styled from 'styled-components';

const  StyledText = styled.div`
`;

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

class Text extends Component {
  constructor(props) {
    super(props);
  }

  keyPress(e) {
    this.props.handleOnKeyPress(e, this.props.charToType);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keyPress.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keyPress.bind(this), false);
  }

  paragraphs() {
    const { text, currentPosition, currentPara, errorPosition } = this.props;

    return this
      .props
      .text
      .map((t, i) =>
        (<Paragraph
           key={i}
           text={t}
           errorPosition={errorPosition}
           currentPosition={currentPosition}
           currentPara={i === currentPara}
           className={`para-${i}`}> >
        </Paragraph>
        )
      );
  }

  render() {
    return (
      <StyledText>
        {
          this.paragraphs()
        }
      </StyledText>
    );
  }
}

export default connect(
  (state => ({
    text: state.text,
    currentPosition: state.currentPosition,
    currentPara: state.currentPara,
    charToType: state.charToType,
    errorPosition: state.errorPosition,
  })),
  {
    handleOnKeyPress
  }
)(Text);
