import { createSlice } from '@reduxjs/toolkit'
import get from "lodash/get";
const _ = { get };

// Initial state for reducer
const initialState = {};

const slice = createSlice({
  name: 'company',
  initialState: initialState,
  reducers: {
    tabChangeRequest: (state, action) => {
      return { loading: true };
    },
    tabChangeSuccess: (state, payload) => {
      return { loading: false, tab: _.get(payload, "payload.tab", "dashboard"), innerTab: _.get(payload, "payload.innerTab", "") };
    },
  }
});

// Actions
export const { tabChangeRequest, tabChangeSuccess } = slice.actions;

// Reducers
export default slice.reducer;