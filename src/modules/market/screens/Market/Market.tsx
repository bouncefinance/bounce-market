import { Box, Container, Tab, Tabs } from '@material-ui/core';
import {
  isShowFtTabs,
  NftFtKeys,
  NftFtTabs as tabs,
} from 'modules/common/conts';
import { Products } from 'modules/market/components/Products';
import { useTabActivityStyles } from 'modules/profile/components/TabActivity/useTabActivityStyles';
import React, { useCallback, useState } from 'react';
import { FtMarket } from './FtMarket';

export const Market = () => {
  const styles = useTabActivityStyles();
  const [tabKey, setTabKey] = useState<NftFtKeys>(NftFtKeys.NFT);

  const onTabsChange = useCallback((_, value) => {
    setTabKey(value);
  }, []);

  return (
    <>
      <Container>
        <Box mt={3}></Box>
        {isShowFtTabs && (
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
        )}
      </Container>
      {tabKey === NftFtKeys.NFT ? <Products /> : <FtMarket />}
    </>
  );
};
