import React, { useEffect } from 'react';
import { useTabActivityStyles } from './useTabActivityStyles';
import { useAccount } from '../../../account/hooks/useAccount';
import { useDispatchRequest } from '@redux-requests/react';
import { fetchActivitiesTable } from '../../actions/fetchActivitiesTable';
import { ActivitiesTable } from './ActivitiesTable';
import { ResponseData } from '../../../common/types/ResponseData';
import { Queries } from '../../../common/components/Queries/Queries';

export const TabActivity = () => {
  const classes = useTabActivityStyles();

  const dispatch = useDispatchRequest();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      dispatch(
        fetchActivitiesTable({
          user: address,
        }),
      );
    }
  }, [isConnected, address, dispatch]);

  return (
    <Queries<ResponseData<typeof fetchActivitiesTable>>
      requestActions={[fetchActivitiesTable]}
    >
      {({ data }) => <ActivitiesTable data={data} classes={classes} />}
    </Queries>
  );
};
