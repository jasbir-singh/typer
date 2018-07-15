export const TYPE_STARTED = 'TYPE_STARTED';
export const TYPE_SUCCESS = 'TYPE_SUCESS';
export const TYPE_FAIL = 'TYPE_FAIL';
export const UPDATE_TYPING_STATS = 'UPDATE_TYPING_STATS';
export const TYPE_FINISHED = 'TYPE_FINISHED';

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
    currentTime: Date.now(),
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

export {
  typeSuccess,
  typeStarted,
  typeFail,
  typeFinished,
  updateTypingStats,
}
