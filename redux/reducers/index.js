import {combineReducers} from "redux";

import CategoriesReducer from './categories';
import EntryReducer from './entries';

export default combineReducers({categories: CategoriesReducer, entries: EntryReducer})
