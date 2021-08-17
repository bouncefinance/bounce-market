import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type colorValueType = number;
type userColorMapType = { [key in string]: number };

export interface IUserState {
  colors: userColorMapType;
}

const initialState: IUserState = {
  colors: {},
};

interface IColor {
  userName: string;
  randomColor: colorValueType;
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserColorMap: (state, action: PayloadAction<IColor>) => {
      const colorInfo = action.payload;
      state.colors[colorInfo.userName] = colorInfo.randomColor;
      state.colors = {
        ...state.colors,
        [colorInfo.userName]: colorInfo.randomColor,
      };
    },
  },
});
const { updateUserColorMap } = userSlice.actions;

export const addUserColorDataAsync = (color: IColor) => async (
  dispatch: any,
) => {
  dispatch(updateUserColorMap(color));
};
