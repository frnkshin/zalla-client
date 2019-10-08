import {ON_INIT, ON_TICK} from "components/Timer/types";

export const initialize = date => {
  const getSecondsRemaining = (date) => {
    let updatedAt = Date.parse(date);
    let expireAt = updatedAt + (3600 * 1000);
    let secondsRemaining = Math.floor((expireAt - updatedAt) / 1000);
    if (secondsRemaining > 0) return secondsRemaining;
    else return 0;
  };

  return {
    type: ON_INIT,
    secondsRemaining: getSecondsRemaining(date),
  };
};

export const tick = (secondsRemaining) => {
  return {
    type: ON_TICK,
    secondsRemaining: secondsRemaining - 1,
  }
};
