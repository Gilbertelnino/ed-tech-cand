import { createSlice } from '@reduxjs/toolkit'

type initialStateInterface = {
  show: any,
  message: string,
  type: string
};

const initialState: initialStateInterface = {
  show: null,
  message: "",
  type: ""
};

const snakeBarReducer = createSlice({
  name: 'common/snake-bar',
  initialState: initialState,
  reducers: {
    triggerSnakeBar: (state, { payload }) => {
      return { ...payload };
    },
    resetSnakeBar: () => {
      return { ...initialState };
    }
  }
});

// Actions
export const { triggerSnakeBar, resetSnakeBar } = snakeBarReducer.actions;

// Reducers
export default snakeBarReducer.reducer;
