import {
  ON_STATUS_CHANGE,
  ON_ACQUIRING_LONG_URL,
  ON_ACQUIRING_SHORT_URL,
} from 'components/Form/types';

const INITIAL_STATE = {
  status: "initial",
  shortUrl: "",
  longUrl: "",
};

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case ON_ACQUIRING_LONG_URL:
      return {...state, url: action.payload};
    case ON_ACQUIRING_SHORT_URL:
      return {...state, shortUrl: action.payload};
    case ON_STATUS_CHANGE:
      return {...state, status: action.payload};
    default:
      return state;
  }
}