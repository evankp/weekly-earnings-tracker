export const ADD_ENTRY = 'ADD_ENTRY';
export const REMOVE_ENTRY = 'REMOVE_ENTRY';
export const CLEAR_CATEGORY = 'CLEAR_CATEGORY';

export function addEntry(entry) {
    return {
        type: ADD_ENTRY,
        entry
    }
}

export function removeEntry(id) {
    return {
        type: REMOVE_ENTRY,
        id
    }
}

export function clearCategory(id) {
    return {
        type: CLEAR_CATEGORY,
        id
    }
}
