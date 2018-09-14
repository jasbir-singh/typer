import {
  TYPE_STARTED,
  UPDATE_TYPING_STATS,
  TYPE_FINISHED,
} from '../actions';

const initialState = {
  current: (new Date()).getTime(),
  startedAt: null,
  finishedAt: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
  case TYPE_STARTED:
  case UPDATE_TYPING_STATS:
  case TYPE_FINISHED:
    console.log(action);
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};
