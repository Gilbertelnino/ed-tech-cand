import { combineReducers } from 'redux';

import usersListReducer from './usersList.reducer';

export default combineReducers({
  usersList: usersListReducer
});
