const getPosition = (state) => (state.positions[state.positions.length - 1]);
const getWordToType = (state) => {
  const pos = getPosition(state);
  return state.text[pos.paragraph][pos.word];
};

export {
  getPosition,
  getWordToType,
}
