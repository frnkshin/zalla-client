import {ON_INIT, ON_TICK} from "components/Timer/types";

const INITIAL_STATE = {
  secondsRemaining: "",
};

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case ON_INIT:
      return {...state, secondsRemaining: action.secondsRemaining};
    case ON_TICK:
      return {...state, secondsRemaining: action.secondsRemaining};
    default:
      return state;
  }
};
