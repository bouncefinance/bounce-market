import { Tab, Tabs } from "@material-ui/core";
import { useTabActivityStyles } from "modules/profile/components/TabActivity/useTabActivityStyles";
import { useCallback, useState } from "react";
import { NftFtKeys, NftFtTabs as tabs } from 'modules/common/conts';
import { TabOwnedFt } from "./ftlist";
import { TabOwnedNft } from "./nftlist";

export const TabOwned: React.FC<{
  isOther?: boolean;
  address?: string;
  reload?: () => void;
}> = function ({ isOther = false, address: artAddress, reload }) {

  const styles = useTabActivityStyles();
  const [tabKey, setTabKey] = useState<NftFtKeys>(NftFtKeys.NFT);

  const onTabsChange = useCallback((_, value) => {
    setTabKey(value);
  }, []);

  return <>

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
    {tabKey === NftFtKeys.NFT ?
      <TabOwnedNft isOther={isOther} address={artAddress} reload={reload} />
      : <TabOwnedFt isOther={isOther} address={artAddress} reload={reload} />
    }
  </>
};
