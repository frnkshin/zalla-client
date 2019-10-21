import {ON_CHANGE, ON_ERROR, ON_INIT} from "components/LinkBox/types";

const INITIAL_STATE = {
    text: "",
    label: "",
    error: false,
};

const reducer = (namespace) => (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case `${namespace}/${ON_CHANGE}`:
            return {...state, text: action.payload};
        case `${namespace}/${ON_ERROR}`:
            return {...state, error: action.payload};
        case `${namespace}/${ON_INIT}`:
            return {...state, label: action.payload};
        default:
            return state;
    }
};

export default reducer;
