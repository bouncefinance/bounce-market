import { Container } from '@material-ui/core';
import { useAccount } from 'modules/account/hooks/useAccount';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useMemo, useState } from 'react';
import { Avatar } from '../components/Avatar';
import { Bio } from '../components/Bio';
import { Header } from '../components/Header';
import { InfoPanel } from '../components/InfoPanel';
import { Social } from '../components/Social';
import { Subscribers } from '../components/Subscribers';
import { TabItems } from '../components/TabItems';
import { TabPanel } from '../components/TabPanel';
import { Tabs } from '../components/Tabs';
import { useProfileStyles } from './useProfileStyles';

enum TabList {
  items,
  brands,
  activity,
  liked,
  following,
  followers,
}

export const Profile = () => {
  const classes = useProfileStyles();
  const { address } = useAccount();

  const [tab, setTab] = useState<TabList>(TabList.items);

  const onTabsChange = useCallback((_, value) => {
    setTab(value);
  }, []);

  const tabs = useMemo(
    () => [
      {
        value: TabList.items,
        label: 'My items',
      },
      {
        value: TabList.brands,
        label: 'My brands',
      },
      {
        value: TabList.activity,
        label: 'Activity',
      },
      {
        value: TabList.liked,
        label: 'Liked',
        count: 0,
      },
      {
        value: TabList.following,
        label: 'Following',
        count: 11,
      },
      {
        value: TabList.followers,
        label: 'Followers',
        count: 150,
      },
    ],
    [],
  );

  return (
    <Section className={classes.root}>
      <Header img="https://picsum.photos/1920/300?random=1" />

      <Container>
        <Avatar className={classes.avatar} isEditable />

        <InfoPanel
          name="Unnamed"
          url="@my_custom_url"
          subscribers={<Subscribers count={150} withFollow />}
          social={<Social />}
          address={address}
        />

        <Bio>
          I'm a digital artist from Buenos Aires. I build surreal semi-static
          worlds to share my perception: everything is as beautiful as it is
          absurd. Wonder manifests itself to those who take the time to stop and
          observe.
        </Bio>

        <Tabs
          className={classes.tabs}
          items={tabs}
          onChange={onTabsChange}
          value={tab}
        />

        <TabPanel value={tab} index={TabList.items}>
          <TabItems />
        </TabPanel>

        <TabPanel value={tab} index={TabList.brands}>
          brands
        </TabPanel>
      </Container>
    </Section>
  );
};
