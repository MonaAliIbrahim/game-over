import { combineReducers } from "redux";
import AuthReducer from './AuthReducer.js';
import GamesReducer from './GamesReducer';

export const reducers = combineReducers({
  auth: AuthReducer,
  games: GamesReducer
})