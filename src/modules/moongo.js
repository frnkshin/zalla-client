import Axios from "axios";
import {SERVER_URL} from "config";

export const createLink = (word, url) => {
  let data = {word: word, url: url};
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Axios.post(`${SERVER_URL}/api/link`, data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err.response);
        });
    }, 2000);
  });
};

export const getLink = (word) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Axios.get(`${SERVER_URL}/api/link/${word}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    }, 2000);
  });
};
