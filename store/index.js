import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);

persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });

export default store;





//
//
//
//
// STORE/index.js
//
//
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import { AsyncStorage } from 'react-native';
// import { createStore, applyMiddleware } from 'redux';
// import { persistStore, persistCombineReducers } from 'redux-persist';
// import reducers from '../reducers';
//
// const config = {
//  key: 'root',
//  storage: AsyncStorage,
//  whitelist: ['messages']
// };
//
// const reducer = persistCombineReducers(config, reducers);
//
// export default function configureStore(initialState = {}) {
//  const store = createStore(
//      reducer,
//      initialState,
//      applyMiddleware(thunk, logger)
//  );
//
//  const persistor = persistStore(store);
//  return { persistor, store };
// }
