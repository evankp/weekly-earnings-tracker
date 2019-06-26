import {ADD_CATEGORY, EDIT_CATEGORY, INIT_CATEGORIES, REMOVE_CATEGORY} from '../actions/categories';

export default function (state = [], action) {
    switch (action.type) {
        case ADD_CATEGORY:
            return [
                ...state,
                action.category
            ];

        case REMOVE_CATEGORY:
            return state.filter(category => category.id !== action.id);

        case EDIT_CATEGORY:
            return state.map(category => {
                if (category.id !== action.id) return category;

                return {
                    ...category,
                    title: action.title
                }
            });

        case INIT_CATEGORIES:
            return action.categories;

        default:
            return state
    }
}
