import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  typeSuccess,
  typeStarted,
  typeFail,
  typeFinished,
  fetchRandomArticle,
} from './actions';
import styled from 'styled-components';
import Paragraph from './Paragraph';

const  StyledText = styled.div`
  line-height: 1.6em;
  font-size: 1.2em;
  margin-bottom: 2em;
`;

class Text extends Component {
  constructor(props) {
    super(props);
  }

  keyPress(key) {
    const {
      text,
      currentPosition,
      currentPara,
      charToType,
      typeStarted,
      typeSuccess,
      typeFail,
      typeFinished
    } = this.props;

    if (currentPosition === 0) typeStarted();

    if (key.key === charToType) {
      if ((currentPara === (text.length - 1)) && (text[currentPara].length - 1 === currentPosition)) {
        typeFinished();
      } else {
        typeSuccess(key, currentPosition);
      };
    } else {
      typeFail(key, charToType);
    };
  }

  componentDidMount() {
    this.props.fetchRandomArticle();
    document.addEventListener('keypress', this.keyPress.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keyPress.bind(this), false);
  }

  paragraphs() {
    const {
      text,
      currentPosition,
      currentPara,
      errorPosition
    } = this.props;

    return this
      .props
      .text
      .map((t, i) =>
           (<Paragraph
            key={i}
            text={t}
            {
              ...{
                errorPosition,
                currentPosition,
                currentPara,
              }
            }
            paraIndex={i}
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

const mapStateToProps = state => ({
  text: state.text,
  currentPosition: state.currentPosition,
  currentPara: state.currentPara,
  charToType: state.charToType,
  errorPosition: state.errorPosition,
});

const mapDispatchToProps = {
  typeSuccess,
  typeStarted,
  typeFail,
  typeFinished,
  fetchRandomArticle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Text);
