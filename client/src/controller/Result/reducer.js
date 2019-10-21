import {ON_URL_RETRIEVAL, ON_COMPLETE, ON_ERROR} from "components/Linker/types";

const INITIAL_STATE = {
  isComplete: false,
  isError: false,
  url: "",
};

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case ON_COMPLETE:
      return {...state, isComplete: action.payload};
    case ON_URL_RETRIEVAL:
      return {...state, url: action.payload};
    case ON_ERROR:
      return {...state, isError: action.payload};
    default:
      return state;
  }
};
