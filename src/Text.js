import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  fetchRandomArticle,
  typeSuccess,
  typeStarted,
  typeFail,
  typeFinished,
  handleSuccesfulTypedKey,
} from './actions';
import styled from 'styled-components';
import Paragraph from './Paragraph';

const  StyledText = styled.div`
  line-height: 1.6em;
  font-size: 1.2em;
  margin-bottom: 2em;
`;

class Text extends Component {
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

    if ((position.word === 0) && !startedTypingAt) typeStarted();

    if (key.key === wordToType[position.char]) {
      handleSuccesfulTypedKey(key, position, text);
    } else {
      typeFail(key.key, wordToType[position.char]);
    };
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keyPress.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keyPress.bind(this), false);
  }

  paragraphs() {
    return this
      .props
      .text
      .map(
        (paragraph, i) => (
          <Paragraph key={i} {...this.props} text={paragraph} paraIndex={i} className={`para-${i}`}> >
          </Paragraph>
        )
      );
  }

  render() {
    return (
      <StyledText className="text-justify jumbotron">
        {
          this.paragraphs()
        }

        {
          this.props.title && <p><em>{this.props.title}</em></p>
        }
      </ StyledText>
    );
  }
}

const mapStateToProps = state => ({
  text: state.text,
  title: state.title,
  position: state.position,
  wordToType: state.wordToType,
  errorPosition: state.errorPosition,
  startedTypingAt: state.startedTypingAt,
});

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
