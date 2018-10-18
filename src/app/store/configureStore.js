import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

export const configureStore = (initialState) => {
  // Array of middlewares
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(...storeEnhancers);
  
  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancer
  );

  // Checks if not in production and module reload is on
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // If state changes in the store, it hot reloads the app
    module.hot.accept('../reducers/rootReducer', () => {
      const newRootReducer = require('../reducers/rootReducer').default;
      store.replaceReducer(newRootReducer);
    });
  }

  return store;
}