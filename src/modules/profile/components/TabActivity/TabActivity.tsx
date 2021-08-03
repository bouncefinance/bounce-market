import React, { useEffect, useCallback, useState } from 'react';
import { useTabActivityStyles } from './useTabActivityStyles';
import { useAccount } from '../../../account/hooks/useAccount';
import { useDispatchRequest } from '@redux-requests/react';
import { fetchActivitiesTable } from '../../actions/fetchActivitiesTable';
import { ActivitiesTable } from './ActivitiesTable';
import { ResponseData } from '../../../common/types/ResponseData';
import { Queries } from '../../../common/components/Queries/Queries';
import { ActivityKeys } from '../../api/getActivity';
import { ActivitiesNoItems } from './ActivitiesNoItems';
import { Tabs, Tab } from '@material-ui/core';

export const TabActivity = () => {
  const styles = useTabActivityStyles();
  const tabs = [
    {
      label: 'Create',
      value: ActivityKeys.Create,
    },
    {
      label: 'Listings',
      value: ActivityKeys.Listings,
    },
    {
      label: 'Bids',
      value: ActivityKeys.Bids,
    },
    {
      label: 'Purchases',
      value: ActivityKeys.Purchases,
    },
    {
      label: 'Sales',
      value: ActivityKeys.Sales,
    },
    // {
    //   label: 'Transfers',
    //   value: ActivityKeys.Transfers,
    // },
  ];
  const dispatch = useDispatchRequest();
  const { address } = useAccount();
  const [tabKey, setTabKey] = useState<ActivityKeys>(ActivityKeys.Create);

  const onTabsChange = useCallback((_, value) => {
    setTabKey(value);
  }, []);

  useEffect(() => {
    if (address && tabKey) {
      dispatch(
        fetchActivitiesTable({
          filter: tabKey,
          accountaddress: address,
        }),
      );
    }
  }, [address, dispatch, tabKey]);

  return (
    <>
      <Tabs
        variant="scrollable"
        classes={{
          root: styles.tabs,
          indicator: styles.tabsIndicator,
        }}
        onChange={onTabsChange}
        value={tabKey}
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            classes={{
              root: styles.tabRoot,
              selected: styles.tabSelected,
            }}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Queries<ResponseData<typeof fetchActivitiesTable>>
        requestActions={[fetchActivitiesTable]}
      >
        {({ data, loading }) => {
          if (loading || !data?.length) {
            return <ActivitiesNoItems />;
          }
          return (
            <ActivitiesTable
              data={data}
              tabKey={tabKey} // TODO: 需要按链接提取
              symbol={'BNB'}
            />
          );
        }}
      </Queries>
    </>
  );
};
