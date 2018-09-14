import { Map, OrderedSet } from 'immutable';
import {
  TYPE_FAIL
} from '../actions';

export default (state = OrderedSet(), action) => {
  switch(action.type) {
  case TYPE_FAIL:
    const newErrorPosition = Map(action.payload);
    return state.has(newErrorPosition) ? state : state.add(newErrorPosition) ;
  default:
    return state;
  }
};
