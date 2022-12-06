import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import { AuthReducer } from './AuthSlice';
import { GamesReducer } from './GamesSlice';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';

const Store = configureStore({
  reducer: {
    auth: AuthReducer,
    games: GamesReducer
  },
  middleware: new MiddlewareArray().concat([thunk]),
})

export default Store;