import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
const _ = { get };

type initialStateInterface = {
	loading: boolean,
	saveLoading: boolean,
	flag: any,
	errors: object,
	message: string,
	profileUpdateMessage: string,
	profileUpdateErrors: object,
	data: object,
	updateFlag: any,
	uploadFlag: boolean,
	uploadLoading: boolean,
	videoDeleteFlag: boolean,
	deleteVideoLoading: boolean
};

const initialState: initialStateInterface = {
	data: {},
	flag: null,
	errors: {},
	message: "",
	profileUpdateMessage: "",
	profileUpdateErrors: {},
	loading: false,
	saveLoading: false,
	updateFlag: null,
	uploadFlag: false,
	uploadLoading: false,
	videoDeleteFlag: false,
	deleteVideoLoading: false,
};

const slice = createSlice({
	name: "company/profile",
	initialState: initialState,
	reducers: {

		getCompanyDetailRequest: (state) => {
			return { ...state, loading: true, flag: null, uploadFlag: false, videoDeleteFlag: false, updateFlag: null, errors: {} };
		},
		getCompanyDetailSuccess: (state, { payload }) => {
			return {
				...state,
				loading: false,
				flag: true,
				errors: {},
				data: _.get(payload, 'data', {}),
				message: _.get(payload, "message", "")
			};
		},
		getCompanyDetailFail: (state, { payload }) => {
			return {
				...state,
				loading: false,
				flag: false,
				message: _.get(payload, "message", ""),
				errors: _.get(payload, "errors", {})
			};
		},
		updateCompanyProfileRequest: (state, payload) => {
			return { ...state, saveLoading: true, updateFlag: null }
		},
		updateCompanyProfileSuccess: (state, { payload }) => {
			return { ...state, saveLoading: false, updateFlag: true, profileUpdateMessage: payload.message };
		},
		updateCompanyProfileFailed: (state, { payload }) => {
			return { ...state, saveLoading: false, updateFlag: false, profileUpdateMessage: _.get(payload, "message", ""), profileUpdateErrors: _.get(payload, "errors", {}) };
		},
		updateCompanyProfileResetFlag: (state) => {
			return { ...state, updateFlag: null, profileUpdateMessage: "" };
		},
		updateCompanyProfilePartiallyRequest: (state, { payload }) => {
			return { ...state, data: payload };
		},

		uploadCompanyFileRequest: (state, payload) => {
			return {
				...state,
				uploadLoading: true
			}
		},
		uploadCompanyFileSuccess: (state, { payload }) => {
			return {
				...state,
				uploadLoading: false,
				uploadFlag: true,
				message: _.get(payload, 'message', '')
			};
		},
		uploadCompanyFileFailed: (state, { payload }) => {
			return {
				...state,
				uploadLoading: false,
				uploadFlag: false,
				message: _.get(payload, 'message', ''),
				errors: _.get(payload, 'errors', {})
			};
		},

		uploadCompanyProfileImageRequest: (state, payload) => {
			return {
				...state,
				uploadProfileImageLoading: true,
				profileImageErrors: {},
				uploadProfileImageFlag: null
			}
		},
		uploadCompanyProfileImageSuccess: (state, { payload }) => {
			return {
				...state,
				uploadProfileImageLoading: false,
				uploadProfileImageFlag: true,
				uploadProfileImageData: _.get(payload, 'data', {}),
				profileImageMessage: _.get(payload, 'message', '')
			};
		},
		uploadCompanyProfileImageFailed: (state, { payload }) => {
			return {
				...state,
				uploadProfileImageLoading: false,
				uploadProfileImageFlag: false,
				profileImageMessage: _.get(payload, 'message', ''),
				profileImageErrors: _.get(payload, 'errors', {})
			};
		},
		uploadCompanyProfileImageReset: (state) => {
			return {
				...state,
				uploadProfileImageLoading: false,
				uploadProfileImageFlag: null,
				profileImageMessage: "",
				uploadProfileImageData: {},
				profileImageErrors: {}
			};
		},

		uploadCompanyBannerImageRequest: (state, payload) => {
			return {
				...state,
				uploadBannerImageLoading: true,
				bannerImageErrors: {},
				uploadBannerImageFlag: null
			}
		},
		uploadCompanyBannerImageSuccess: (state, { payload }) => {
			return {
				...state,
				uploadBannerImageLoading: false,
				uploadBannerImageFlag: true,
				bannerImageMessage: _.get(payload, 'message', '')
			};
		},
		uploadCompanyBannerImageFailed: (state, { payload }) => {
			return {
				...state,
				uploadBannerImageLoading: false,
				uploadBannerImageFlag: false,
				bannerImageMessage: _.get(payload, 'message', ''),
				bannerImageErrors: _.get(payload, 'errors', {})
			};
		},

		deleteVideoRequest: (state, payload) => {
			return {
				...state,
				videoDeleteFlag: false,
				deleteVideoLoading: true
			}
		},
		deleteVideoSuccess: (state, { payload }) => {
			return {
				...state,
				deleteVideoLoading: false,
				videoDeleteFlag: true,
				message: _.get(payload, 'message', '')
			};
		},
		deleteVideoFailed: (state, { payload }) => {
			return {
				...state,
				deleteVideoLoading: false,
				videoDeleteFlag: false,
				message: _.get(payload, 'message', ''),
				errors: _.get(payload, 'errors', {})
			};
		},

		resetCompanyDetailRequest: () => {
			return initialState;
		},
	}
});

export const {
	getCompanyDetailRequest, getCompanyDetailSuccess, getCompanyDetailFail, resetCompanyDetailRequest,
	updateCompanyProfileRequest, updateCompanyProfileSuccess, updateCompanyProfileFailed, updateCompanyProfileResetFlag,
	updateCompanyProfilePartiallyRequest,
	uploadCompanyFileRequest, uploadCompanyFileFailed, uploadCompanyFileSuccess,
	uploadCompanyProfileImageRequest, uploadCompanyProfileImageFailed, uploadCompanyProfileImageSuccess, uploadCompanyProfileImageReset,
	uploadCompanyBannerImageRequest, uploadCompanyBannerImageFailed, uploadCompanyBannerImageSuccess,
	deleteVideoRequest, deleteVideoSuccess, deleteVideoFailed
} = slice.actions;

export default slice.reducer;
