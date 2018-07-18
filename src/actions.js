import * as API from './api';
export const TYPE_STARTED = 'TYPE_STARTED';
export const TYPE_SUCCESS = 'TYPE_SUCESS';
export const TYPE_FAIL = 'TYPE_FAIL';
export const UPDATE_TYPING_STATS = 'UPDATE_TYPING_STATS';
export const TYPE_FINISHED = 'TYPE_FINISHED';
export const FETCH_RANDOM_ARTICLE_SUCCESS = 'FETCH_RANDOM_ARTICLE_SUCCESS';

//
// https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Stack%20Overflow
const typeStarted = () => ({
  type: TYPE_STARTED,
  payload: {
    startedTypingAt: Date.now(),
  }
});

const typeSuccess = (key, currentPosition) => ({
  type: TYPE_SUCCESS,
  payload: {
    lastKeyTyped: key.key,
    // currentTime: Date.now(),
  }
});

const typeFail = (key) => ({
  type: TYPE_FAIL,
  payload: {
    lastKeyTyped: key.key,
  }
});

const typeFinished = () => ({
  type: TYPE_FINISHED,
  payload: {}
});

const updateTypingStats = () => ({
  type: UPDATE_TYPING_STATS,
  payload: {
    currentTime: Date.now()
  }
});

const fetchRandomArticle = () => ({ type: 'FETCH_RANDOM_ARTICLE' });

export {
  typeSuccess,
  typeStarted,
  typeFail,
  typeFinished,
  updateTypingStats,
  fetchRandomArticle,
}
