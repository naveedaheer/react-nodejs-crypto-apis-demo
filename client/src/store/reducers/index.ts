import { combineReducers } from 'redux';
import { cryptoReducers } from "./crypto.reducers"
/**
 * all reducers
 */

export const rootReducer = combineReducers({
    cryptoReducers
});

export type RootState = ReturnType<typeof rootReducer>
