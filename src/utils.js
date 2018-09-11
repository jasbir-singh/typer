const numberOfCharsinAWord = 5;

const sum = arr => arr.reduce((a, b) => a + b, 0);
const roundTo2Dp = num => Math.round(num, 2);
const minutesSinceTyping = seconds => (seconds/60) || 0;
const wordsPerMin = cpm => Math.round(cpm/numberOfCharsinAWord, 2);
const charsPerMin = (chars, seconds) => {
  return chars && minutesSinceTyping(seconds) ? Math.round(chars / minutesSinceTyping(seconds), 2) : 0;
};

export {
  charsPerMin,
  sum,
  roundTo2Dp,
  minutesSinceTyping,
  wordsPerMin,
};
