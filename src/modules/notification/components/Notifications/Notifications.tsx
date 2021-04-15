import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { uid } from 'react-uid';
import {
  INotificationProps,
  notificationSlice,
} from '../../store/notificationSlice';
import { Alert } from '@material-ui/lab';
import { useAppSelector } from '../../../../store/useAppSelector';

interface IItemProps {
  data: INotificationProps;
  onClose: (key?: any) => void;
}

function Item({ data, onClose }: IItemProps) {
  const handleClose = useCallback(() => {
    onClose(data.key);
  }, [data.key, onClose]);

  return (
    <Snackbar open={true} {...data}>
      <Alert severity={data.severity} onClose={handleClose}>
        {data.message}
      </Alert>
    </Snackbar>
  );
}

export const Notifications = () => {
  const notifications = useAppSelector(state => state.notifications.queue);
  const dispatch = useDispatch();

  const handleClose = (id: string) => {
    dispatch(notificationSlice.actions.hideNotification(id));
  };

  return (
    <>
      {notifications.map(item => (
        <Item key={uid(item)} data={item} onClose={handleClose} />
      ))}
    </>
  );
};
