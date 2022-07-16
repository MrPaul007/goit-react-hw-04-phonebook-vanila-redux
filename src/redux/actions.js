import { ADD_CONTACT, REMOVE_CONTACT, FILTER_CONTACT, SAVE_FROM_LOCALSTORAGE } from "./types";
import { nanoid } from "nanoid";

export const addContact = (payload) => {
    return {
        type: ADD_CONTACT,
        payload: {
            ...payload,
            id: nanoid(),
        }
    }
}; 

export const removeContact = (payload) => {
    return {
        type: REMOVE_CONTACT,
        payload
    }
};

export const filterContact = (payload) => {
    return {
        type: FILTER_CONTACT,
        payload
    }
};

export const saveFromLocalStorage = (payload) => {
    return {
        type: SAVE_FROM_LOCALSTORAGE,
        payload
    }
};