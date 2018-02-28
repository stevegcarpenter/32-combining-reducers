import { createStore } from 'redux';
// pulls in combineReducers from '../reducers/index.js'
import reducer from '../reducers';

export default () => createStore(reducer);
