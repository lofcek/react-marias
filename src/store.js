import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';



export default function create(reducers, initialState) {
  const logger = createLogger();
  const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk, promise, logger)
  );
  return store;
  
  
  //const create = applyMiddleware(thunk)(createStore);
  //return applyMiddleware(thunk, promise, logger);
  //(reducer, initialState);
}