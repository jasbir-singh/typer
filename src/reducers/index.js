import { combineReducers } from 'redux';

import text from '../reducers/text';
import positions from '../reducers/positions';
import errors from '../reducers/errors';
import time from '../reducers/time';

import {
  RESET_TYPING_STATE,
  TYPE_STARTED,
  TYPE_SUCCESS,
  TYPE_FAIL,
  TYPE_FINISHED,
  FETCH_RANDOM_ARTICLE_SUCCESS,
  FETCH_RANDOM_ARTICLE
} from '../actions';

export default combineReducers({
  time: time,
  text: text,
  positions: positions,
  errors: errors,
});
