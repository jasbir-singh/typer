import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

const getArticle = () => {};

function* fetchRandomArticle(action) {
  debugger;
  try {
    const user = yield call(getArticle);
    yield put({type: 'FETCH_RANDOM_ARTICLE_SUCCEEDED', user: user});
  } catch (e) {
    yield put({type: 'FETCH_RANDOM_ARTICLE_FAILED', message: e.message});
  }
}

function* rootSaga() {
  yield takeLatest('FETCH_RANDOM_ARTICLE', fetchRandomArticle);
};

export default rootSaga;
