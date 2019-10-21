import {ON_STATUS_CHANGE, ON_TIMESTAMP_RETRIEVAL, ON_URL_RETRIEVAL} from "controller/Result/types";

const INITIAL_STATE = {
  status: "loading",
  url: "",
  updatedAt: ""
};

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case ON_STATUS_CHANGE:
      return {...state, status: action.payload};
    case ON_URL_RETRIEVAL:
      return {...state, url: action.payload};
    case ON_TIMESTAMP_RETRIEVAL:
      return {...state, updatedAt: action.payload};
    default:
      return state;
  }
};
