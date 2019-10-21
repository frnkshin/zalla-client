import {ON_CHANGE, ON_ERROR, ON_INIT} from "components/LinkBox/types";

export const setText = (namespace, text) => {
    return {
        type: `${namespace}/${ON_CHANGE}`,
        payload: text
    }
};

export const setError = (namespace, isError) => {
    return {
        type: `${namespace}/${ON_ERROR}`,
        payload: isError
    }
};

export const setLabel = (namespace, label) => {
    return {
        type: `${namespace}/${ON_INIT}`,
        payload: label
    }
};
