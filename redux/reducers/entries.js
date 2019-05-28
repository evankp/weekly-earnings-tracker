import {ADD_ENTRY, CLEAR_CATEGORY, REMOVE_ENTRY} from "../actions/entries";

export default function (state = [], action) {
    switch (action.type) {
        case ADD_ENTRY:
            return [
                ...state,
                action.entry
            ];

        case REMOVE_ENTRY:
            return state.filter(entry => entry.id !== action.id);

        case CLEAR_CATEGORY:
            return state.filter(entry => entry.category !== action.id);

        default:
            return state
    }
}
