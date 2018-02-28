import { combineReducers } from 'redux';
import expenseReducer from './expense';
import categoryReducer from './category';

export default combineReducers({
  expenses: expenseReducer,
  categories: categoryReducer,
});
