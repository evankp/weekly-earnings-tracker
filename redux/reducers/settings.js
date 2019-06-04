import {ADD_SETTING, EDIT_SETTING, REMOVE_SETTING} from "../actions/settings";
import omit from 'lodash/omit'

const defaultState = {
    goals: {
        daily: 0,
        weekly: 0
    }
};

export default function settings(state = defaultState, action) {
    switch (action.type) {
        case ADD_SETTING:
            return {
                ...state,
                [action.key]: action.setting
            };

        case EDIT_SETTING:
            return {
              ...state,
              [action.setting]: action.value
            };

        case REMOVE_SETTING:
            return omit(state, action.setting);

        default:
            return state
    }
}
