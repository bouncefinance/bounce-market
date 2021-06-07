import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from 'store';

export const LAYOUT_STATE_NAME = 'layout';

interface ILayoutState {
  mobileNavShowed: boolean;
  searchShowed: boolean;
}

const initialState: ILayoutState = {
  mobileNavShowed: false,
  searchShowed: false,
};

const slice = createSlice({
  name: LAYOUT_STATE_NAME,
  initialState,
  reducers: {
    toggleNav(state, action) {
      state.mobileNavShowed = action.payload;
    },
    toggleSearch(state, action) {
      state.searchShowed = action.payload;
    },
  },
});

export const layoutReducer = slice.reducer;

export const layoutActions = {
  ...slice.actions,
};

const selectLayout = (state: RootState) => state[LAYOUT_STATE_NAME];

export const layoutSelectors = {
  [LAYOUT_STATE_NAME]: selectLayout,

  mobileNavShowed: createSelector(selectLayout, selectedState => {
    return selectedState.mobileNavShowed;
  }),

  searchShowed: createSelector(selectLayout, selectedState => {
    return selectedState.searchShowed;
  }),
};
