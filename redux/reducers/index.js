import {combineReducers} from "redux";

import CategoriesReducer from './categories';
import EntryReducer from './entries';
import SettingsReducer from './settings'

export default combineReducers({categories: CategoriesReducer, entries: EntryReducer, settings: SettingsReducer})
