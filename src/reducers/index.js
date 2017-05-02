import {combineReducers} from 'redux';
import groceryListReducer from './reducer_grocerylist';

const rootReducer = combineReducers({
  grocerylist: groceryListReducer
})

export default rootReducer
