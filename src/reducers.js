import {
  RESET_TYPING_STATE,
  TYPE_STARTED,
  TYPE_SUCCESS,
  TYPE_FAIL,
  TYPE_FINISHED,
  UPDATE_TYPING_STATS,
  FETCH_RANDOM_ARTICLE_SUCCESS,
  FETCH_RANDOM_ARTICLE
} from './actions';
import { splitWords } from './utils.js';
// import { combineReducers } from 'redux';

const text1 = `Did you ever stop to think that a dog is the only animal that doesn't have to work for a living? A hen has to lay eggs, a cow has to give milk, and a canary has to sing. But a dog makes his living by giving you nothing but love.`;

const text2 = `When I was five years old, my father bought a little yellow-haired pup for fifty cents. He was the light and joy of my childhood. Every afternoon about four-thirty, he would sit in the front yard with his beautiful eyes staring steadfastly at the path, and as soon as he heard my voice or saw me swinging my dinner pail through the buck brush, he was off like a shot, racing breathlessly up the hill to greet me with leaps of joy and barks of sheer ecstasy. `;

// const text1 = `I am nobody.`;
// const text2 = `Second line.`;

const text = splitWords([
  text1,
  text2
]);

export const nullState = {
  text: [['']],
  wordToType: null,
  position: {
    word: 0,
    char: 0,
    paragraph: 0,
  },
  numberOfErrors: 0,
  typingFinished: false,
}

const initialState = {
  ...nullState,
  text: text,
  wordToType: text[0][0],
};

export default (state = initialState, action) => {
  switch(action.type) {
  case FETCH_RANDOM_ARTICLE:
  case FETCH_RANDOM_ARTICLE_SUCCESS:
  case UPDATE_TYPING_STATS:
  case TYPE_FINISHED:
  case TYPE_SUCCESS:
  case RESET_TYPING_STATE:
  case TYPE_STARTED:
    return {
      ...state,
      ...action.payload,
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
