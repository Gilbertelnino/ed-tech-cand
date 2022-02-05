import { combineReducers } from 'redux';
import employeeSizeReducer from "./employeeSize.reducer";

export default combineReducers({
  list: employeeSizeReducer
});
