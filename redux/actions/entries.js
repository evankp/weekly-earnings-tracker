export const ADD_ENTRY = 'ADD_ENTRY';
export const REMOVE_ENTRY = 'REMOVE_ENTRY';
export const CLEAR_CATEGORY = 'CLEAR_CATEGORY';
export const EDIT_ENTRY = 'EDIT_ENTRY';
export const INIT_ENTRIES = 'INIT_ENTRIES';

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

export function editEntry(id, entry) {
    return {
        type: EDIT_ENTRY,
        id,
        entry
    }
}

export function initEntries(entries) {
    return {
        type: INIT_ENTRIES,
        entries
    }
}

export function clearCategory(id) {
    return {
        type: CLEAR_CATEGORY,
        id
    }
}
