import { combineReducers } from 'redux';

import jobReducer from './jobs.reducer';

export default combineReducers({
  jobs: jobReducer,
});
