import { END, eventChannel } from 'redux-saga';
import { put, race, SagaReturnType, take, takeEvery } from 'redux-saga/effects';
import {
  INotificationProps,
  notificationSlice,
} from '../store/notificationSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { NotificationActions } from '../store/NotificationActions';

function* showNotification(action: PayloadAction<INotificationProps>) {
  const payload = action.payload;

  const channel = eventChannel(emitter => {
    const onClose = () => {
      emitter(true);
      emitter(END);
    };
    setImmediate(() => emitter(onClose));
    return () => null;
  });

  const handleClose: SagaReturnType<() => () => void> = yield take(channel);

  const notification: INotificationProps = {
    ...payload,
    onClose: handleClose,
  };

  yield put(notificationSlice.actions.pushNotificationToTheQueue(notification));

  try {
    yield race([
      take(channel),
      take(
        (filterAction: any) =>
          filterAction.type ===
            notificationSlice.actions.hideNotification.toString() &&
          notification.key === filterAction.payload,
      ),
    ]);
  } finally {
    yield put(notificationSlice.actions.hideNotification(notification.key));
  }
}

export function* notificationSaga() {
  yield takeEvery(
    NotificationActions.showNotification.toString(),
    showNotification,
  );
}
