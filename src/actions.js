const typeStarted = () => ({
  type: 'TYPE_STARTED',
  state: {
    startedTypingAt: Date.now(),
  }
});

const typeSuccess = (key, currentPosition) => ({
  type: 'TYPE_SUCCESS',
  state: {
    lastKeyTyped: key.key,
    currentTime: Date.now(),
  }
});

const typeFail = (key) => ({
  type: 'TYPE_FAIL',
  state: {
    lastKeyTyped: key.key,
  }
});

export {
  typeSuccess,
  typeStarted,
  typeFail,
}
