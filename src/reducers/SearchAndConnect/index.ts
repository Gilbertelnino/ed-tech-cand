import { combineReducers } from 'redux';

import searchAndConnectReducer from './searchAndConnect.reducer';

export default combineReducers({
  search: searchAndConnectReducer,
});
