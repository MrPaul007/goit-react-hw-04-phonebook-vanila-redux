import { ADD_CONTACT, REMOVE_CONTACT, FILTER_CONTACT, SAVE_FROM_LOCALSTORAGE } from "./types";
import initialContacts from "../data/initialContacts.json";

const storeWithFilter = {
    contacts: initialContacts,
    filter: ""
}

const reducer = (store = storeWithFilter, {type, payload}) => {
    const { contacts } = store;
    switch (type) {
        case ADD_CONTACT:
            const newContacts = [...contacts, payload];
            return {
                ...store,
                contacts: newContacts
            };
        case REMOVE_CONTACT:
            const result = contacts.filter(contact => contact.id !== payload);
            return {
                ...store,
                contacts: result
            };
        case FILTER_CONTACT:
            return {
                ...store,
                filter: payload
            };  
        case SAVE_FROM_LOCALSTORAGE:
            return {
                ...store,
                contacts: payload
            }              
        default:
            return store;
    }
};

export default reducer;