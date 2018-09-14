import {
  FETCH_RANDOM_ARTICLE_SUCCESS,
  FETCH_RANDOM_ARTICLE
} from '../actions';
import howToMakeFriendsAndInfluencePeople from '../fixtures.js';

const initialState = howToMakeFriendsAndInfluencePeople;
export default (state = howToMakeFriendsAndInfluencePeople, action) => {
  switch(action.type) {
  // case FETCH_RANDOM_ARTICLE:
  case FETCH_RANDOM_ARTICLE_SUCCESS:
    return action.payload;
  default:
    return state;
  }
};
