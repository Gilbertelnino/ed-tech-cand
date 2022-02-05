import { combineReducers } from 'redux';

import connectionNotificationReducer from './connectionNotification.reducer';

export default combineReducers({
  list: connectionNotificationReducer,
});
