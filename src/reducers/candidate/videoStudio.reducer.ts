import { createSlice } from '@reduxjs/toolkit';
import { get } from "lodash";
import { combineReducers } from "@reduxjs/toolkit";
const _ = { get };

interface IState {
  loading: boolean,
  data: Array<any>;
  flag?: any;
  errors?: any;
  message: string
}

const initialState: IState = {
  loading: false,
  data: [],
  flag: null,
  message: ""
};

const videoStudioList = createSlice({
  name: 'VIDEO_STUDIO',
  initialState: initialState,
  reducers: {
    videoStudioListRequest: (state, { payload }) => {
      return { ...state, loading: true };
    },
    videoStudioListSuccess: (state, { payload }) => {
      return { ...state, loading: false, data: _.get(payload, 'data.data', []) }
    },
    videoStudioListError: (state, { payload }) => {
      return { ...state, loading: false }
    },
    videoStudioListUpdate: (state, { payload }) => {
      return { ...state, data: payload }
    },
    videoStudioListReset: (state) => {
      return { ...initialState }
    }
  }
});

const createVideoReducer = createSlice({
  name: 'VIDEO_STUDIO',
  initialState: initialState,
  reducers: {
    createVideoRequest: (state, { payload }) => {
      return { ...initialState, loading: true };
    },
    createVideoSuccess: (state, { payload }) => {
      return { ...state, flag: true, loading: false, message: _.get(payload, "message", "") }
    },
    createVideoError: (state, { payload }) => {
      return { ...state, flag: false, loading: false, message: _.get(payload, "message", ""), errors: (payload.errors || {}) }
    },
    createVideoReset: (state) => {
      return { ...initialState }
    }
  }
});

const updateVideoReducer = createSlice({
  name: 'VIDEO_STUDIO',
  initialState: initialState,
  reducers: {
    updateVideoRequest: (state, { payload }) => {
      return { ...initialState, loading: true };
    },
    updateVideoSuccess: (state, { payload }) => {
      return { ...state, flag: true, loading: false, message: _.get(payload, "message", "") }
    },
    updateVideoError: (state, { payload }) => {
      return { ...state, flag: false, loading: false, message: _.get(payload, "message", ""), errors: (payload.errors || {}) }
    },
    updateVideoReset: (state) => {
      return { ...initialState }
    }
  }
});

const setPrimaryVideoReducer = createSlice({
  name: 'VIDEO_STUDIO',
  initialState: initialState,
  reducers: {
    setPrimaryVideoRequest: (state, { payload }) => {
      return { ...initialState, loading: true };
    },
    setPrimaryVideoSuccess: (state, { payload }) => {
      return { ...state, flag: true, loading: false, message: _.get(payload, "message", ""), data: _.get(payload, "data", 0) }
    },
    setPrimaryVideoError: (state, { payload }) => {
      return { ...state, flag: false, loading: false, message: _.get(payload, "message", ""), errors: (payload.errors || {}) }
    },
    setPrimaryVideoReset: (state) => {
      return { ...initialState }
    }
  }
});

const deleteVideoReducer = createSlice({
  name: 'VIDEO_STUDIO',
  initialState: initialState,
  reducers: {
    deleteVideoRequest: (state, { payload }) => {
      return { ...initialState, loading: true };
    },
    deleteVideoSuccess: (state, { payload }) => {
      return { ...state, flag: true, loading: false, message: _.get(payload, "message", ""), data: _.get(payload, "data", 0) }
    },
    deleteVideoError: (state, { payload }) => {
      return { ...state, flag: false, loading: false, message: _.get(payload, "message", "") }
    },
    deleteVideoReset: (state) => {
      return { ...initialState }
    }
  }
});

// Actions
export const {
  videoStudioListRequest, videoStudioListSuccess, videoStudioListError, videoStudioListUpdate, videoStudioListReset,
  setPrimaryVideoRequest, setPrimaryVideoSuccess, setPrimaryVideoError, setPrimaryVideoReset,
  updateVideoRequest, updateVideoSuccess, updateVideoError, updateVideoReset,
  createVideoRequest, createVideoSuccess, createVideoError, createVideoReset,
  deleteVideoRequest, deleteVideoSuccess, deleteVideoError, deleteVideoReset,
} = {
  ...videoStudioList.actions,
  ...createVideoReducer.actions,
  ...updateVideoReducer.actions,
  ...deleteVideoReducer.actions,
  ...setPrimaryVideoReducer.actions,
};


// Export reducers
export default combineReducers({
  list: videoStudioList.reducer,
  create: createVideoReducer.reducer,
  update: updateVideoReducer.reducer,
  delete: deleteVideoReducer.reducer,
  setPrimaryVideo: setPrimaryVideoReducer.reducer
});
