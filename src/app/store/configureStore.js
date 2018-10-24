import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore'
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import firebase from '../config/firebase';

const reactReduxFirebaseConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true
}

export const configureStore = (initialState) => {
  // Array of middlewares
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(
    ...storeEnhancers, 
    reactReduxFirebase(firebase, reactReduxFirebaseConfig),
    reduxFirestore(firebase)
  );
  
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