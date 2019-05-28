export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';

export function addCategory(category) {
    return {
        type: ADD_CATEGORY,
        category
    }
}

export function removeCategory(id) {
    return {
        type: REMOVE_CATEGORY,
        id
    }
}

export function editCategory({id, title}) {
    return {
        type: EDIT_CATEGORY,
        id,
        title
    }
}
