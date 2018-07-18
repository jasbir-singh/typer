import {
  TYPE_STARTED,
  TYPE_SUCCESS,
  TYPE_FAIL,
  TYPE_FINISHED,
  UPDATE_TYPING_STATS,
  FETCH_RANDOM_ARTICLE_SUCCESS,
  FETCH_RANDOM_ARTICLE
} from './actions';
// import { combineReducers } from 'redux';

const text1 = `Did you ever stop to think that a dog is the only animal that doesn't have to work for a living? A hen has to lay eggs, a cow has to give milk, and a canary has to sing. But a dog makes his living by giving you nothing but love.`;

const text2 = `When I was five years old, my father bought a little yellow-haired pup for fifty cents. He was the light and joy of my childhood. Every afternoon about four-thirty, he would sit in the front yard with his beautiful eyes staring steadfastly at the path, and as soon as he heard my voice or saw me swinging my dinner pail through the buck brush, he was off like a shot, racing breathlessly up the hill to greet me with leaps of joy and barks of sheer ecstasy. `;

// const text1 = `First line.`;
// const text2 = `Second line.`;

const text = [text1, text2];
const initialState = {
  text: text,
  currentPosition: 0,
  currentPara: 0,
  numberOfErrors: 0,
  charToType: text[0][0],
  typingFinished: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
  case FETCH_RANDOM_ARTICLE:
  case FETCH_RANDOM_ARTICLE_SUCCESS:
  case UPDATE_TYPING_STATS:
  case TYPE_STARTED:
    return {
      ...state,
      ...action.payload,
    };
  case TYPE_FINISHED:
    return {
      ...state,
      ...action.payload,
      typingFinished: true,
      typingStarted: false,
    };
  case TYPE_SUCCESS:
    let currentPara;
    let newCurrentPosition = state.currentPosition + 1;
    if (state.text[state.currentPara][newCurrentPosition] === undefined) {
      currentPara = state.currentPara + 1;
      newCurrentPosition = 0;
    } else {
      currentPara = state.currentPara;
    };

    return {
      ...state,
      ...action.payload,
      currentPara: currentPara,
      currentPosition: newCurrentPosition,
      charToType: state.text[currentPara][newCurrentPosition],
      errorPosition: null,
    };
  case TYPE_FAIL:
    return {
      ...state,
      ...action.payload,
      numberOfErrors: state.numberOfErrors + 1,
      errorPosition: state.currentPosition,
    };
  default:
    return state;
  }
};
