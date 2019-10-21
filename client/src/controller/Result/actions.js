import {ON_COMPLETE, ON_ERROR, ON_URL_RETRIEVAL} from "components/Linker/types";

export const handleComplete = isComplete => {
  return {
    type: ON_COMPLETE,
    payload: isComplete,
  };
};

export const setUrl = (url) => {
  return {
    type: ON_URL_RETRIEVAL,
    payload: url,
  };
};

export const handleError = isError => {
  return {
    type: ON_ERROR,
    payload: isError,
  };
};
