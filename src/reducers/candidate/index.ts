import { combineReducers } from 'redux';
import candidatesReducer from "./candidate.reducer";
import videoStudioReducer from "./videoStudio.reducer";


export default combineReducers({
  candidates: candidatesReducer,
  videoStudio: videoStudioReducer
});
