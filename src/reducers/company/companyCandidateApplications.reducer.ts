import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
const _ = { get };

interface IState {
	loading: boolean,
	data: Array<any>;
	flag?: any;
	message: string
}

const initialState: IState = {
	loading: false,
	data: [],
	flag: null,
	message: ""
};

const listReducer = createSlice({
	name: "COMPANY_CANDIDATE",
	initialState: initialState,
	reducers: {

		companyCandidateApplicationsRequest: (state, action) => {
			return { ...initialState, loading: true };
		},
		companyCandidateApplicationsSuccess: (state, { payload }) => {
			return { ...state, loading: false, flag: true, data: _.get(payload, 'data', []), pagination: _.get(payload, 'pagination', {}) };
		},
		companyCandidateApplicationsUpdate: (state, { payload }) => {
			return { ...state, data: _.get(payload, 'data', []) };
		},
		companyCandidatesApplicationsFail: (state, { payload }) => {
			return {
				...state,
				loading: false,
				flag: false,
				message: _.get(payload, "message", ""),
				errors: _.get(payload, "errors", {})
			};
		}
	}
});

const updateStatus = createSlice({
	name: "COMPANY_CANDIDATE",
	initialState: initialState,
	reducers: {
		companyCandidateUpdateStatusRequest: (state, action) => {
			return { ...initialState, loading: true };
		},
		companyCandidateUpdateStatusSuccess: (state, { payload }) => {
			return { ...state, loading: false, flag: true, message: _.get(payload, "message", ""), data: _.get(payload, "data", {}) };
		},
		companyCandidateUpdateStatusFail: (state, { payload }) => {
			return {
				...state,
				loading: false,
				flag: false,
				message: _.get(payload, "message", ""),
				data: _.get(payload, "data", {})
			};
		},
		companyCandidateUpdateStatusReset: (state) => {
			return { ...initialState };
		},

	}
});



const favoriteReducer = createSlice({
	name: "COMPANY_CANDIDATE",
	initialState: initialState,
	reducers: {
		companyCandidateToggleFavoriteRequest: (state, action) => {
			return { ...initialState, loading: true };
		},
		companyCandidateToggleFavoriteSuccess: (state, { payload }) => {
			return { ...state, loading: false, flag: true, message: _.get(payload, "message", ""), data: _.get(payload, "data", {}) };
		},
		companyCandidatesToggleFavoriteFail: (state, { payload }) => {
			return {
				...state,
				loading: false,
				flag: false,
				message: _.get(payload, "message", ""),
				data: _.get(payload, "data", {})
			};
		},
		companyCandidatesToggleFavoriteReset: (state) => {
			return { ...initialState };
		},
	}
});


// Export actions
export const {
	companyCandidateApplicationsRequest, companyCandidateApplicationsSuccess, companyCandidatesApplicationsFail, companyCandidateApplicationsUpdate,
	companyCandidateUpdateStatusRequest, companyCandidateUpdateStatusSuccess, companyCandidateUpdateStatusFail, companyCandidateUpdateStatusReset,
	companyCandidateToggleFavoriteRequest, companyCandidateToggleFavoriteSuccess, companyCandidatesToggleFavoriteFail, companyCandidatesToggleFavoriteReset
} = {
	...listReducer.actions,
	...updateStatus.actions,
	...favoriteReducer.actions
};

// Export reducers
export default combineReducers({
	list: listReducer.reducer,
	favorite: favoriteReducer.reducer,
	updateStatus: updateStatus.reducer
});
