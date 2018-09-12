import { splitWords, stripHTML } from './utils.js';
import * as API from './api';
import { nullState } from './reducers';

export const FETCH_RANDOM_ARTICLE_FAILED = 'FETCH_RANDOM_ARTICLE_FAILED';
export const TYPE_STARTED = 'TYPE_STARTED';
export const TYPE_SUCCESS = 'TYPE_SUCCESS';
export const TYPE_FAIL = 'TYPE_FAIL';
export const UPDATE_TYPING_STATS = 'UPDATE_TYPING_STATS';
export const TYPE_FINISHED = 'TYPE_FINISHED';
export const FETCH_RANDOM_ARTICLE_SUCCESS = 'FETCH_RANDOM_ARTICLE_SUCCESS';
export const FETCH_RANDOM_ARTICLE = 'FETCH_RANDOM_ARTICLE';
export const RESET_TYPING_STATE = 'RESET_TYPING_STATE';

const resetTypingState = () => ({
  type: RESET_TYPING_STATE,
  payload: nullState
});

const typeStarted = () => {
  const currentTime = (new Date()).getTime();
  return {
    type: TYPE_STARTED,
    payload: {
        currentTime,
        startedTypingAt: currentTime,
      }
  };
};

const typeSuccess = ({ paragraph, char, word, text}) => ({
  type: TYPE_SUCCESS,
  payload: {
    position: { paragraph, char, word },
    wordToType: text[paragraph][word]
  }
});

const typeFail = (key) => ({
  type: TYPE_FAIL,
  payload: {
    lastKeyTyped: key,
  }
});

const typeFinished = () => ({
  type: TYPE_FINISHED,
  payload: {
    typingFinished: true,
    typingStarted: false,
    position: {
      char: 0,
      word: 0,
      paragraph: 0,
    }
  }
});

const updateTypingStats = () => ({
  type: UPDATE_TYPING_STATS,
  payload: {
    currentTime: (new Date()).getTime()
  }
});

const fetchRandomArticle = () => (
  {
    type: 'FETCH_RANDOM_ARTICLE',
    payload: { loading: true }
  }
);


const handleSuccesfulTypedKey = (key, position, text) => dispatch => {
  const isWordFinished = text[position.paragraph][position.word].length === position.char + 1;
  const isLastWordOfPara = text[position.paragraph].length === position.word + 1;
  const isLastPara = text.length === position.paragraph + 1;


  if (isLastPara && isLastWordOfPara && isWordFinished ) {
    dispatch(typeFinished());
  } else if (isLastWordOfPara && isWordFinished) {
    dispatch(typeSuccess({ text, paragraph: position.paragraph + 1, word: 0, char: 0 }));
  } else if (isWordFinished) {
    dispatch(typeSuccess({ text , ...position, word: position.word + 1, char: 0 }));
  } else {
    dispatch(typeSuccess({ text, ...position, char: position.char + 1 }));
  };
};

const fetchRandomArticleSuccess = (rawText, title) => {
  const text = splitWords(stripHTML(rawText).split("\n").filter(para => para.length !== 0));
  return {
    type: 'FETCH_RANDOM_ARTICLE_SUCCESS',
    payload: {
      text: text,
      title: title,
      wordToType: text[0][0],
      loading: false,
    }
  };
};

export {
  resetTypingState,
  handleSuccesfulTypedKey,
  typeSuccess,
  typeStarted,
  typeFail,
  typeFinished,
  updateTypingStats,
  fetchRandomArticle,
  fetchRandomArticleSuccess,
}
