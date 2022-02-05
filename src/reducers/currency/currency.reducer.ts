import { createSlice } from '@reduxjs/toolkit'
import { get } from "lodash";
const _ = { get };

// Initial state for reducer
const initialState = {
  loading: false,
  data: []
};

const slice = createSlice({
  name: 'currency',
  initialState: initialState,
  reducers: {

    currencyListRequest: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    currencyListSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        data: _.get(payload, 'data', [])
      };
    },
    currencyListFailed: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        message: _.get(payload, 'message', ''),
        errors: _.get(payload, 'errors', {})
      };
    }
  }
});

// Actions
export const { currencyListRequest, currencyListSuccess, currencyListFailed } = slice.actions;

// Reducers
export default slice.reducer;
