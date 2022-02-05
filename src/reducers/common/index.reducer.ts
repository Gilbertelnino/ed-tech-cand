import { combineReducers } from 'redux';
import jobTitleReducer from "./jobTitle.reducer";
import departmentReducer from "./department.reducer";
import quoteOfTheDayReducer from "./quoteOfTheDay.reducer";
import snakeBarReducer from "./snakeBar.reducer";
import navBarReducer from './navBar.reducer';


export default combineReducers({
  jobTitle: jobTitleReducer,
  department: departmentReducer,
  quoteOfTheDay: quoteOfTheDayReducer,
  snakeBar: snakeBarReducer,
  navBar: navBarReducer,
});
