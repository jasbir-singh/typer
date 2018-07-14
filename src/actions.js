const typeSuccess = (key) => ({
  type: 'TYPE_SUCCESS',
  key: key.key
});

const typeFail = (key) => ({
  type: 'TYPE_FAIL',
  key: key.key
});

const handleOnKeyPress = (key, charToType) => {
  if (key.key === charToType) {
    return typeSuccess(key);
  } else {
    return typeFail(key, charToType);
  };
};

export {
  handleOnKeyPress
}
