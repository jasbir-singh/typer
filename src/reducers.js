import { Map, OrderedSet } from 'immutable';

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
import howToMakeFriendsAndInfluencePeople from './fixtures.js';
// import { combineReducers } from 'redux';

export const nullState = {
  text: [['']],
  wordToType: null,
  position: {
    word: 0,
    char: 0,
    paragraph: 0,
  },
  numberOfErrors: 0,
  errorPositions: OrderedSet(),
  typingFinished: false,
};

const initialState = {
  ...nullState,
  text: howToMakeFriendsAndInfluencePeople,
  wordToType: howToMakeFriendsAndInfluencePeople[0][0],
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
    const {
      lastKeyTyped,
      errorPosition
    } = action.payload;
    const { errorPositions } = state;
    const newErrorPosition = Map(errorPosition);
    return {
      ...state,
      lastKeyTyped,
      numberOfErrors: state.numberOfErrors + 1,
      errorPositions: errorPositions.has(newErrorPosition) ? errorPositions : errorPositions.add(newErrorPosition),
    };
  default:
    return state;
  }
};
