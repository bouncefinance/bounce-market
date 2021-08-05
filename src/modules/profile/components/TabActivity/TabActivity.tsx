import React, { useEffect, useCallback, useState } from 'react';
import { useTabActivityStyles } from './useTabActivityStyles';
import { useAccount } from '../../../account/hooks/useAccount';
import { useDispatchRequest } from '@redux-requests/react';
import { fetchActivitiesTable } from '../../actions/fetchActivitiesTable';
import { ActivitiesTable } from './ActivitiesTable';
import { ResponseData } from '../../../common/types/ResponseData';
import { Queries } from '../../../common/components/Queries/Queries';
import { ActivityKeys } from '../../api/getActivity';
import { Tabs, Tab } from '@material-ui/core';
import { NoItems } from 'modules/common/components/NoItems';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { t } from 'modules/i18n/utils/intl';

export const TabActivity = () => {
  const styles = useTabActivityStyles();
  const tabs = [
    {
      label: t('profile.activity.tab.create'),
      value: ActivityKeys.Create,
    },
    {
      label: t('profile.activity.tab.listings'),
      value: ActivityKeys.Listings,
    },
    {
      label: t('profile.activity.tab.bids'),
      value: ActivityKeys.Bids,
    },
    {
      label: t('profile.activity.tab.purchases'),
      value: ActivityKeys.Purchases,
    },
    {
      label: t('profile.activity.tab.sales'),
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
        empty={
          <NoItems
            href={MarketRoutesConfig.Market.generatePath()}
            title={t('profile.no-items.Activity-title')}
            descr={t('profile.no-items.Activity-description')}
          />
        }
      >
        {({ data }) => {
          return (
            <ActivitiesTable
              data={data.sort((a, b) => b.ctime - a.ctime)}
              tabKey={tabKey} // TODO: 需要按链接提取
              symbol={'BNB'}
            />
          );
        }}
      </Queries>
    </>
  );
};
