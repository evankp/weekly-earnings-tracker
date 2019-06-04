export const ADD_SETTING = 'ADD_SETTING';
export const EDIT_SETTING = 'EDIT_SETTING';
export const REMOVE_SETTING = 'REMOVE_SETTING';

export function addSetting(key, setting) {
    return {
        type: ADD_SETTING,
        key,
        setting
    }
}

export function editSetting(setting, value) {
    return {
        type: EDIT_SETTING,
        setting,
        value
    }
}

export function removeSetting(setting) {
    return {
        type: REMOVE_SETTING,
        setting
    }
}
