import {ADD_ENTRY, CLEAR_CATEGORY, EDIT_ENTRY, INIT_ENTRIES, REMOVE_ENTRY} from '../actions/entries';

export default function (state = [], action) {
    switch (action.type) {
        case ADD_ENTRY:
            return [
                ...state,
                action.entry
            ];

        case REMOVE_ENTRY:
            return state.filter(entry => entry.id !== action.id);

        case EDIT_ENTRY:
            return state.map(entry => entry.id === action.id ? action.entry: entry);

        case INIT_ENTRIES:
            return action.entries;

        case CLEAR_CATEGORY:
            return state.filter(entry => entry.category !== action.id);

        default:
            return state
    }
}
