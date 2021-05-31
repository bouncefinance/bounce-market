import React, { useEffect } from 'react';
import { useTabActivityStyles } from './useTabActivityStyles';
import { useAccount } from '../../../account/hooks/useAccount';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { fetchActivitiesTable } from '../../actions/fetchActivitiesTable';
import { ActivitiesTable } from './ActivitiesTable';
import { ResponseData } from '../../../common/types/ResponseData';
import { Queries } from '../../../common/components/Queries/Queries';
import { IActivityTableItem } from '../../api/getActivity';
import { ActivitiesNoItems } from './ActivitiesNoItems';

export const TabActivity = () => {
  const classes = useTabActivityStyles();

  const dispatch = useDispatchRequest();
  const { isConnected, address } = useAccount();

  const activitiesTable = useQuery<IActivityTableItem[] | null>({
    type: fetchActivitiesTable.toString(),
  });

  useEffect(() => {
    if (isConnected && address) {
      dispatch(
        fetchActivitiesTable({
          user: address,
        }),
      );
    }
  }, [isConnected, address, dispatch]);

  const hasItems = !!activitiesTable.data && activitiesTable.data.length > 0;

  return hasItems || activitiesTable.loading ? (
    <Queries<ResponseData<typeof fetchActivitiesTable>>
      requestActions={[fetchActivitiesTable]}
    >
      {({ data }) => <ActivitiesTable data={data} classes={classes} />}
    </Queries>
  ) : (
    <ActivitiesNoItems />
  );
};
