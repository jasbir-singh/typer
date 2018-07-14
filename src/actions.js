const typeStarted = () => ({
  type: 'TYPE_STARTED',
  payload: {
    startedTypingAt: Date.now(),
  }
});

const typeSuccess = (key, currentPosition) => ({
  type: 'TYPE_SUCCESS',
  payload: {
    lastKeyTyped: key.key,
    currentTime: Date.now(),
  }
});

const typeFail = (key) => ({
  type: 'TYPE_FAIL',
  payload: {
    lastKeyTyped: key.key,
  }
});

const updateTypingStats = () => ({
  type: 'UPDATE_TYPING_STATS',
  payload: {
    currentTime: Date.now()
  }
});

export {
  typeSuccess,
  typeStarted,
  typeFail,
  updateTypingStats,
}
