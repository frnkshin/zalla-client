import {
  ON_ACQUIRING_LONG_URL,
  ON_ACQUIRING_SHORT_URL,
  ON_STATUS_CHANGE,
} from "components/Form/types";

// actions generators
export const setLongUrl = (url) => {
  return {
    type: ON_ACQUIRING_LONG_URL,
    payload: url,
  }
};

export const setShortUrl = url => {
  return {
    type: ON_ACQUIRING_SHORT_URL,
    payload: url,
  }
};

export const setStatus = status => {
  return {
    type: ON_STATUS_CHANGE,
    payload: status,
  }
};
