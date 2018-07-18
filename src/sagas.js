import { call, put, takeLatest } from 'redux-saga/effects';
import * as API from './api';

const fetchRandomArticleSuccess = (text, title) => ({
  type: 'FETCH_RANDOM_ARTICLE_SUCCESS',
  payload: {
    text: [text],
    title: title,
    currentPosition: 0,
    currentPara: 0,
    numberOfErrors: 0,
    charToType: text[0],
    typingFinished: false,
    loading: false,
  }
});

const stripHTML = str => str.replace(/<(?:.|\n)*?>/gm, '');

async function asyncWikiCall() {
  let text;
  let numOfCalls = 0;
  while (true) {
    if ((numOfCalls > 10) || (text && (!text.title.match(/user|talk|Wikipedia|Template/i) && text.extract.length > 100))) {
      break;
    } else {
      const response = await API.wikiGetRandomArticle();
      text = Object.values(response.data.query.pages)[0];
      numOfCalls++;
    };
  }
  return text;
}

function* fetchRandomArticle(action) {
  try {
    const text = yield call(asyncWikiCall);

    yield put(fetchRandomArticleSuccess(stripHTML(text.extract), text.title));
  } catch (e) {
    yield put({type: 'FETCH_RANDOM_ARTICLE_FAILED', message: e.message});
  }
}

function* rootSaga() {
  yield takeLatest('FETCH_RANDOM_ARTICLE', fetchRandomArticle);
};

export default rootSaga;
