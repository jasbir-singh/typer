import axios from 'axios';
import { guardianApiKey } from './api_keys';

const randomDate = (start, end) => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const getRandomGuardianArticle = () => {
  const date = randomDate(new Date(2012, 0, 1), new Date());
  const url = `https://content.guardianapis.com/search?q=debate&tag=politics/politics&from-date=${date}&api-key=${guardianApiKey}&show-fields=bodyText`;
  return axios.get(url);
};

const wikiGetRandomArticle = () => {
  const url =
    'https://en.wikipedia.org/w/api.php?origin=*&action=query&generator=random&prop=extracts&exchars=1000&format=json';
  return axios.get(url);
};

export { getRandomGuardianArticle, wikiGetRandomArticle };
