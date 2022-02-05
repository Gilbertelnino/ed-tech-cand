import { combineReducers } from 'redux';
import industryReducer from "./industry.reducer";

export default combineReducers({
  industries: industryReducer
});
