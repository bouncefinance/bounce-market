import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    outLogin: () => {
      // await init function
    },
  },
  reducers: {
    setOutLogion: (state, action) => {
      state.outLogin = action.payload;
    },
  },
});

export const { setOutLogion } = loginSlice.actions;

const loginReducer = loginSlice.reducer;
export default loginReducer;
