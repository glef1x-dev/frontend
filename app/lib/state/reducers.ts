import { combineReducers } from "redux";
import settingsReducer from './settings/slice'
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage' 

const rootPersistConfig = {
    key: 'root',
    whitelist: ['settings'],
    storage,
};

export default persistReducer(rootPersistConfig, combineReducers({
    settings: settingsReducer
}))
