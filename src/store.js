/**
 * Main store function
 */
import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app'], // only app will be persisted
};

function configureStore(initialState = {}) {
  // Middleware and store enhancers
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const logger = store => next => action => {
    next(action);
    console.log('next state', store.getState());
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const enhancers = composeEnhancers(applyMiddleware(logger, thunk));

  const store = createStore(persistedReducer, initialState, enhancers);

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }
  const persistor = persistStore(store);

  return {store, persistor};
}

export default configureStore;
