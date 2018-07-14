import { connect } from 'react-redux';
import React, { Component } from 'react';
import './Text.css';
import { handleOnKeyPress  } from '../actions';

const Paragraph = ({ text, currentPosition, currentPara }) => {
  const charToClass = (index) => {
    return (((index === currentPosition) && currentPara) ? 'current-char' : '');
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
                className={`index-${j} ${charToClass(j)}`}>
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
    const { text, currentPosition, currentPara } = this.props;

    return this
      .props
      .text
      .map((t, i) =>
        (<Paragraph
           key={i}
           text={t}
           currentPosition={currentPosition}
           currentPara={i === currentPara}
           className={`para-${i}`}> >
        </Paragraph>
        )
      );
  }

  render() {
    return (
      <div>
        {
          this.paragraphs()
        }
      </div>
    );
  }
}

export default connect(
  (state => ({
    text: state.text,
    currentPosition: state.currentPosition,
    currentPara: state.currentPara,
    charToType: state.charToType,
  })),
  {
    handleOnKeyPress
  }
)(Text);
