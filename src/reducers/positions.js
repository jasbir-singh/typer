import {
  TYPE_SUCCESS,
  TYPE_FAIL,
} from '../actions';

const initialPosition = {
  word: 0,
  char: 0,
  paragraph: 0,
};

export default (state = [initialPosition], action) => {
  switch(action.type) {
  case TYPE_SUCCESS:
    return [
      ...state,
      action.payload,
    ];
  default:
    return state;
  };
};
