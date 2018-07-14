// import { combineReducers } from 'redux';

const text1 = `Did you ever stop to think that a dog is the only animal that doesn't have to work for a living? A hen has to lay eggs, a cow has to give milk, and a canary has to sing. But a dog makes his living by giving you nothing but love. `;

const text2 = `When I was five years old, my father bought a little yellow-haired pup for fifty cents. He was the light and joy of my childhood. Every afternoon about four-thirty, he would sit in the front yard with his beautiful eyes staring steadfastly at the path, and as soon as he heard my voice or saw me swinging my dinner pail through the buck brush, he was off like a shot, racing breathlessly up the hill to greet me with leaps of joy and barks of sheer ecstasy. `;

const text = [text1, text2];
const initialState = {
  text: text,
  currentPosition: 0,
  currentPara: 0,
  charToType: text[0][0]
};

export default (state = initialState, action) => {
  switch(action.type) {
  case 'TYPE_SUCCESS':
    return {
      ...state,
      key: action.key,
      lastKeyTyped: action.key,
      currentPosition: state.currentPosition + 1,
      charToType: state.text[0][state.currentPosition + 1],
      errorPosition: null,
    };
  case 'TYPE_FAIL':
    return {
      ...state,
      lastKeyTyped: action.key,
      errorPosition: state.currentPosition,
    };
  default:
    return state;
  }
};
