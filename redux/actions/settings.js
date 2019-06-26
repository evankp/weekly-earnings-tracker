export const ADJUST_SETTING = 'ADJUST_SETTING';
export const REMOVE_SETTING = 'REMOVE_SETTING';

export function adjustSetting(setting, value) {
    return {
        type: ADJUST_SETTING,
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
