import { Tab, Tabs } from '@material-ui/core';
import { useTabActivityStyles } from 'modules/profile/components/TabActivity/useTabActivityStyles';
import { useCallback, useState } from 'react';
import {
  isShowFtTabs,
  NftFtKeys,
  NftFtTabs as tabs,
} from 'modules/common/conts';
import { TabSaleNft } from './tabSaleNft';
import { TabSelaErc20 } from './tabSelaErc20';

export const TabSale: React.FC<{
  isOther?: boolean;
  isCollectionSale?: boolean;
  reload?: () => void;
}> = function ({ isOther = false, isCollectionSale, reload }) {
  const styles = useTabActivityStyles();
  const [tabKey, setTabKey] = useState<NftFtKeys>(NftFtKeys.NFT);

  const onTabsChange = useCallback((_, value) => {
    setTabKey(value);
  }, []);

  return (
    <>
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
      {tabKey === NftFtKeys.NFT ? (
        <TabSaleNft
          isOther={isOther}
          isCollectionSale={isCollectionSale}
          reload={reload}
        />
      ) : (
        <TabSelaErc20 isOther={isOther} reload={reload} />
      )}
    </>
  );
};
