const numberOfCharsinAWord = 5;
const stripHTML = str => str.replace(/<(?:.|\n)*?>/gm, '');

const splitWords = arr => arr.map(t => t.match(/([^\s]+)|\s/g));
const sum = arr => arr.reduce((a, b) => a + b, 0);
const roundTo2Dp = num => Math.round(num, 2);
const minutesSinceTyping = seconds => (seconds/60) || 0;
const wordsPerMin = cpm => Math.round(cpm/numberOfCharsinAWord, 2);
const charsPerMin = (chars, seconds) => {
  return chars && minutesSinceTyping(seconds) ? Math.round(chars / minutesSinceTyping(seconds), 2) : 0;
};

const compareObjs = (obj1, obj2) =>  (JSON.stringify(obj1) === JSON.stringify(obj2));

const arrayContains = (arr, needle) => {
  for (let i in arr) {
    if (compareObjs(arr[i], needle)) return true;
  }
  return false;
};
export const lastElement =  arr => arr[arr.length - 1];

export {
  stripHTML,
  splitWords,
  charsPerMin,
  sum,
  roundTo2Dp,
  arrayContains,
  minutesSinceTyping,
  wordsPerMin,
};
