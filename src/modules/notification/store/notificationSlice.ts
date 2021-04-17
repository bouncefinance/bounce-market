import { SnackbarProps } from '@material-ui/core/Snackbar';
import { Color } from '@material-ui/lab';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';

export interface INotificationProps extends SnackbarProps {
  severity: Color;
}

export interface INotificationState {
  queue: INotificationProps[];
}

const initialState: INotificationState = {
  queue: [],
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    pushNotificationToTheQueue: (
      state,
      action: PayloadAction<INotificationProps>,
    ) => {
      const queue = state.queue.filter(item => item.key !== action.payload.key);
      state.queue = [
        ...queue,
        action.payload as WritableDraft<typeof action.payload>,
      ];
    },
    hideNotification: (state, action: PayloadAction<string>) => ({
      ...state,
      queue: state.queue.filter(item => item.key !== action.payload),
    }),
  },
});
