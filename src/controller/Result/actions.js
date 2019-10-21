import {ON_STATUS_CHANGE, ON_URL_RETRIEVAL, ON_TIMESTAMP_RETRIEVAL} from "controller/Result/types";

export const changeStatus = status=> {
  return {
    type: ON_STATUS_CHANGE,
    payload: status,
  }
};

export const changeUrl = url => {
  console.log(url);
  return {
    type: ON_URL_RETRIEVAL,
    payload: url,
  }
};

export const changeUpdatedAt = updatedAt => {
  console.log(updatedAt);
  return {
    type: ON_TIMESTAMP_RETRIEVAL,
    payload: updatedAt,
  }
};
