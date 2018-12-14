import {  createStore } from 'redux'
import reducers from "./Reducers/index"
import { AsyncStorage } from 'react-native';
import midlewares from "./middlewares"
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage : AsyncStorage,
  }
const persistedReducer = persistReducer(persistConfig, reducers)  

export const store = createStore(persistedReducer,midlewares)
export const persistor = persistStore(store)