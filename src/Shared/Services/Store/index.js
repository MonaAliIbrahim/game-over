import { createStore, applyMiddleware } from 'redux'; 
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { reducers } from '../Reducer/index.js';

const Store = createStore(reducers, applyMiddleware(thunk,logger))

export default Store;