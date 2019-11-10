import { splitWords } from './utils.js';

const text1 = `Did you ever stop to think that a dog is the only animal that doesn't have to work for a living? A hen has to lay eggs, a cow has to give milk, and a canary has to sing. But a dog makes his living by giving you nothing but love.`;

const text2 = `When I was five years old, my father bought a little yellow-haired pup for fifty cents. He was the light and joy of my childhood. Every afternoon about four-thirty, he would sit in the front yard with his beautiful eyes staring steadfastly at the path, and as soon as he heard my voice or saw me swinging my dinner pail through the buck brush, he was off like a shot, racing breathlessly up the hill to greet me with leaps of joy and barks of sheer ecstasy. `;

// const text1 = `I am nobody.`;
// const text2 = `Second line.`;

export default splitWords([text1, text2]);
