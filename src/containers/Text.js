import { connect } from 'react-redux';
import React, { Component } from 'react';
import './Text.css';
import {
  typeSuccess,
  typeStarted,
  typeFail,
} from '../actions';
import styled from 'styled-components';
import Paragraph from '../components/Paragraph';

const  StyledText = styled.div`
`;

class Text extends Component {
  constructor(props) {
    super(props);
  }

  keyPress(key) {
    const {
      currentPosition,
      charToType,
      typeStarted,
      typeSuccess,
      typeFail,
    } = this.props;

    if (currentPosition === 0) typeStarted();

    if (key.key === charToType) {
      typeSuccess(key, currentPosition);
    } else {
      typeFail(key, charToType);
    };
  }

  componentDidMount() {
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

const mapStateToProps = state => ({
  text: state.text,
  currentPosition: state.currentPosition,
  currentPara: state.currentPara,
  charToType: state.charToType,
  errorPosition: state.errorPosition,
});

export default connect(
  mapStateToProps,
  {
    typeSuccess,
    typeStarted,
    typeFail,
  }
)(Text);
