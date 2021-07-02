import { Box, Fade, Tab, Tabs } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { ReactNode, useCallback, useState } from 'react';
import { uid } from 'react-uid';

enum TabList {
  history,
  bids,
  owners,
  tokenInfo,
}

const tabs = [
  {
    value: TabList.history,
    label: t('details-nft.tabs.history'),
  },
  {
    value: TabList.bids,
    label: t('details-nft.tabs.bids'),
  },
  {
    value: TabList.owners,
    label: t('details-nft.tabs.owners'),
  },
  {
    value: TabList.tokenInfo,
    label: t('details-nft.tabs.token-info'),
  },
];

const TabPanel = (props: { children?: ReactNode; index: any; value: any }) => {
  const { children, value, index } = props;
  const isActive = value === index;

  return (
    <div role="tabpanel" hidden={!isActive}>
      {isActive && (
        <Fade in={isActive}>
          <Box>{children}</Box>
        </Fade>
      )}
    </div>
  );
};

interface iInfoTabsProps {
  history?: JSX.Element;
  bids?: JSX.Element;
  owners?: JSX.Element;
  tokenInfo?: JSX.Element;
}

export const InfoTabs = ({
  history,
  bids,
  owners,
  tokenInfo,
}: iInfoTabsProps) => {
  const [tab, setTab] = useState<TabList>(TabList.tokenInfo);

  const onTabsChange = useCallback((_, value) => {
    setTab(value);
  }, []);

  return (
    <>
      <Tabs value={tab} onChange={onTabsChange} variant="scrollable">
        {tabs.map(({ label, value }) => (
          <Tab key={uid(label)} label={label} value={value} />
        ))}
      </Tabs>

      <TabPanel value={tab} index={TabList.history}>
        {history}
      </TabPanel>

      <TabPanel value={tab} index={TabList.bids}>
        {bids}
      </TabPanel>

      <TabPanel value={tab} index={TabList.owners}>
        {owners}
      </TabPanel>

      <TabPanel value={tab} index={TabList.tokenInfo}>
        {tokenInfo}
      </TabPanel>
    </>
  );
};
