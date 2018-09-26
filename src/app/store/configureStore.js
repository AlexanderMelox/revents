import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';

export const configureStore = (initialState) => {
  // Array of middlewares
  const middlewares = [];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = compose(...storeEnhancers);
  
  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancer
  );

  return store;
}