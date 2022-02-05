import { createSlice, combineReducers } from '@reduxjs/toolkit'

const saveButtonLoaderReducer = createSlice({
	name: "NAV_BAR",
	initialState: false,
	reducers: {

		navSaveButtonLoading: (state, {payload}) => {
			return payload || false;
		}
	}
});

// Export actions
export const {
	navSaveButtonLoading
} = {
	...saveButtonLoaderReducer.actions
};

// Export reducers
export default combineReducers({
	saveButtonLoading: saveButtonLoaderReducer.reducer,
});
