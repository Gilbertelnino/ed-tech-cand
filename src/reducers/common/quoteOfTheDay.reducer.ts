import { createSlice } from '@reduxjs/toolkit'
import { QUOTES } from "../../utils/quotes";

type initialStateInterface = {
  loading: boolean,
  flag: any, // null, true or false
  data: object,
  message: string
};

const initialState: initialStateInterface = {
  loading: false,
  flag: null,
  data: {},
  message: "",
};

const slice = createSlice({
  name: 'common/quote-of-the-day',
  initialState: initialState,
  reducers: {
    fetchQuoteOfTheDayRequest: (state, action) => {
      return { ...state, loading: true, flag: null, message: "" };
    },
    fetchQuoteOfTheDaySuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        flag: true,
        data: (payload.data || {})
      };
    },
    fetchQuoteOfTheDayFailed: (state, { payload }) => {

      // Adding fallback quotes of the day if anything goes wrong while fetching quotes
      return {
        ...state,
        loading: false,
        flag: false,
        data: (QUOTES || {})
      };
    },
    fetchQuoteOfTheDayReset: (state) => {
      return initialState;
    }
  }
});

// Actions
export const {
  fetchQuoteOfTheDayRequest, fetchQuoteOfTheDaySuccess, fetchQuoteOfTheDayFailed, fetchQuoteOfTheDayReset,
} = slice.actions;

// Reducers
export default slice.reducer;
