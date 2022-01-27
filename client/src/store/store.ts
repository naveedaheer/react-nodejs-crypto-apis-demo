import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer } from './reducers';

/**
 * Don't show redux logs in production
 */
const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV !== 'production',
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
export type AppDispatch = typeof store.dispatch;
