import { connect } from 'react-redux';
import React, { Component } from 'react';
import InputBox from './InputBox.js';
import {
  fetchRandomArticle,
  typeSuccess,
  typeStarted,
  typeFail,
  typeFinished,
  handleSuccesfulTypedKey,
} from '../actions';
import Paragraph from './Paragraph';

class Text extends Component {
  constructor(props) {
    super(props);
    this.keyPress = this.keyPress.bind(this);
  }
  keyPress(key) {
    key.preventDefault();

    const {
      text,
      position,
      wordToType,
      typeStarted,
      handleSuccesfulTypedKey,
      typeFail,
      startedTypingAt,
    } = this.props;

    if ((position.paragraph + position.word + position.char === 0) && !startedTypingAt) {
      typeStarted();
    };

    if (key.key === wordToType[position.char]) {
      handleSuccesfulTypedKey(key, position, text);
    } else {
      typeFail(key.key, wordToType[position.char]);
    };
  }

  componentDidMount() {
    console.log(`added event listner ${this.props.text[0][0]}`);
    document.addEventListener('keypress', this.keyPress, false);
  }

  componentWillUnmount() {
    console.log(`removed event listner ${this.props.text[0][0]}`);
    document.removeEventListener('keypress', this.keyPress, false);
  }

  paragraphs() {
    return this
      .props
      .text
      .map(
        (paragraph, i) => (
          <Paragraph key={`${paragraph}-${i}`} {...this.props} text={paragraph} paraIndex={i} className={`para-${i}`}> >
          </Paragraph>
        )
      );
  }

  render() {
    return (
      <div className="text-justify jumbotron">
        {
          this.paragraphs()
        }

        {
          this.props.title && <p><em>{this.props.title}</em></p>
        }

        <InputBox />
      </ div>
    );
  }
}

const mapStateToProps = state => {
  return {
    text: state.text,
    title: state.title,
    position: state.position,
    wordToType: state.wordToType,
    errorPosition: state.errorPosition,
    startedTypingAt: state.startedTypingAt,
  }
};

const mapDispatchToProps = {
  fetchRandomArticle,
  typeSuccess,
  typeStarted,
  typeFail,
  typeFinished,
  handleSuccesfulTypedKey,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Text);
