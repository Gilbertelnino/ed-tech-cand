import { createSlice } from '@reduxjs/toolkit'
import { get, isEmpty, isNumber } from "lodash";
const _ = { get, isEmpty, isNumber };

interface IState {
  [key: string]: any
}

// Initial state for reducer
const initialState: IState = {
  loading: false,
  flag: false,
  updateflag: null,
  deleteflag: false,
  uploadLoading: false,
  data: [],
  detail: {},
  message: "",
  fileName: "",
  fileSeries: "",
  peopleFilter: {},
  fileNames: ["", "", "", ""]
};

const slice = createSlice({
  name: 'people',
  initialState: initialState,
  reducers: {

    peopleListRequest: (state, payload) => {
      return {
        ...state,
        loading: true
      };
    },
    peopleListSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: false,
        data: _.get(payload, 'data.data', []),
        pagination: {
          current: _.get(payload, "data.pagination.page", 0) === 0 ? 1 : _.get(payload, "data.pagination.page", 0),
          total: _.get(payload, "data.pagination.totalPages", 0),
          pageSize: _.get(payload, "data.pagination.pageSize", 10),
          totalRecords: _.get(payload, "data.pagination.pageRecords", 0),
        }
      };
    },
    peopleListFailed: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: false,
        message: _.get(payload, 'message', ''),
        errors: _.get(payload, 'errors', {})
      };
    },

    getPeopleRequest: (state, payload) => {
      return {
        ...state,
        loading: true
      };
    },
    getPeopleSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: false,
        detail: _.get(payload, 'data', {})
      };
    },
    getPeopleFailed: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: false,
        message: _.get(payload, 'message', ''),
        errors: _.get(payload, 'errors', {})
      };
    },

    createPeopleRequest: (state, payload) => {
      return {
        ...state,
        createLoading: true,
        createFlag: null
      }
    },
    createPeopleSuccess: (state, { payload }) => {
      return {
        ...state,
        createLoading: false,
        createFlag: true,
        message: _.get(payload, 'message', '')
      };
    },
    createPeopleFailed: (state, { payload }) => {
      return {
        ...state,
        createLoading: false,
        createFlag: false,
        message: _.get(payload, 'message', ''),
        createErrors: _.get(payload, 'errors', {})
      };
    },

    deletePeopleRequest: (state, { payload }) => {
      return {
        ...state,
        deleteflag: null,
        deleteLoading: true
      }
    },
    deletePeopleSuccess: (state, { payload }) => {
      return {
        ...state,
        deleteLoading: false,
        deleteflag: true,
        deleteMessage: _.get(payload, 'message', '')
      };
    },
    deletePeopleFailed: (state, { payload }) => {
      return {
        ...state,
        deleteLoading: false,
        deleteflag: false,
        deleteMessage: _.get(payload, 'message', ''),
        deleteErrors: _.get(payload, 'errors', {})
      };
    },
    resetDeletePeople: (state) => {
      return {
        ...state,
        deleteLoading: false,
        deleteflag: null,
        deleteMessage: "",
        deleteErrors: {}
      };
    },

    updatePeopleRequest: (state, payload) => {
      return {
        ...state,
        updateLoading: true,
        updateflag: null,
      }
    },
    updatePeopleSuccess: (state, { payload }) => {
      return {
        ...state,
        updateLoading: false,
        updateflag: true,
        message: _.get(payload, 'message', '')
      };
    },
    updatePeopleFailed: (state, { payload }) => {
      return {
        ...state,
        updateLoading: false,
        updateflag: false,
        message: _.get(payload, 'message', ''),
        updateErrors: _.get(payload, 'errors', {})
      };
    },

    uploadPeopleFileRequest: (state, { payload }) => {
      return {
        ...state,
        uploadLoading: true,
        fileSeries: _.get(payload, "series", "")
      }
    },
    uploadPeopleFileSuccess: (state, { payload }) => {

      const fileIndex = _.get(payload, 'series', '');
      let file = {};
      let file_names = [...state.fileNames];
      if (_.isNumber(fileIndex)) {
        file_names[fileIndex] = _.get(payload, "data[0].encFileName", "");
      } else {
        file = { fileName: _.get(payload, "data[0].encFileName", "") }
      }

      return {
        ...state,
        ...file,
        fileNames: file_names,
        uploadLoading: false,
        message: _.get(payload, 'message', '')
      };
    },
    uploadPeopleFileFailed: (state, { payload }) => {
      return {
        ...state,
        uploadLoading: false,
        message: _.get(payload, 'message', ''),
        errors: _.get(payload, 'errors', {})
      };
    },

    peopleAddFilter: (state, { payload }) => {
      return { ...state, peopleFilter: { ...payload } };
    },

    peopleResetFilter: (state, { payload }) => {
      return { ...state, peopleFilter: { ...payload } };
    },

    peopleReset: (state) => {
      return { ...state, flag: false, fileName: '' };
    },

    peopleDetailReset: (state) => {
      return { ...state, detail: {} };
    },
    peopleErrorsReset: (state) => {
      return { ...state, createErrors: {}, deleteErrors: {}, updateErrors: {} };
    }
  }
});

// Actions
export const {
  peopleReset, peopleDetailReset, peopleAddFilter,
  getPeopleRequest, getPeopleSuccess, getPeopleFailed,
  peopleListRequest, peopleListSuccess, peopleListFailed,
  createPeopleRequest, createPeopleSuccess, createPeopleFailed,
  deletePeopleRequest, deletePeopleSuccess, deletePeopleFailed, resetDeletePeople,
  updatePeopleRequest, updatePeopleSuccess, updatePeopleFailed,
  uploadPeopleFileRequest, uploadPeopleFileSuccess, uploadPeopleFileFailed, peopleErrorsReset
} = slice.actions;

// Reducers
export default slice.reducer;
