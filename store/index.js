import { AsyncStorage } from 'react-native';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'likedJobs',
  ]
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  {},
  compose(
    applyMiddleware(thunk)
  )
);

let persistor = persistStore(store);

export {
  store,
  persistor,
};
