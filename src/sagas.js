import { call, put, takeLatest } from 'redux-saga/effects';
import * as API from './lib/api';
import {
  FETCH_RANDOM_ARTICLE_FAILED,
  FETCH_RANDOM_ARTICLE,
  fetchRandomArticleSuccess,
  resetTypingState
} from './actions.js';

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

function* fetchRandomArticle(_) {
  try {
    const text = yield call(asyncWikiCall);

    yield put(resetTypingState());
    yield put(fetchRandomArticleSuccess(text.extract, text.title));
  } catch (e) {
    yield put({type: FETCH_RANDOM_ARTICLE_FAILED, message: e.message});
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_RANDOM_ARTICLE, fetchRandomArticle);
};

export default rootSaga;
