import { Container, Grid } from '@material-ui/core';
import { useAccount } from 'modules/account/hooks/useAccount';
import { t } from 'modules/i18n/utils/intl';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { uid } from 'react-uid';
import { ActivityTable } from '../components/ActivityTable';
import { Avatar } from '../components/Avatar';
import { Bio } from '../components/Bio';
import { Header } from '../components/Header';
import { InfoPanel } from '../components/InfoPanel';
import { Social } from '../components/Social';
import { Subscribers } from '../components/Subscribers';
import { TabItems } from '../components/TabItems';
import { TabPanel } from '../components/TabPanel';
import { Tabs } from '../components/Tabs';
import { Tab } from '../components/Tabs/Tab';
import { useProfileStyles } from './useProfileStyles';
import { useDispatchRequest } from '@redux-requests/react';
import { fetchAllNftByUser } from '../actions/fetchAllNftByUser';
import { ProductCard } from '../../common/components/ProductCard';
import { Queries } from '../../common/components/Queries/Queries';
import { TabBrands } from '../components/TabBrands';
import { IBrandCardProps } from '../components/BrandCard';
import { IFollowingItemProps, TabFollowing } from '../components/TabFollowing';
import { RoutesConfiguration } from '../../createNFT/Routes';
import { IItem } from '../../overview/api/getItems';
import BigNumber from 'bignumber.js';

/**
 * Temporary samples
 * const items: TabItemProps[] = [
 {
    href: '#',
    title: 'Berserk - Red EthRanger #04 - Ruby Crystal Edition',
    img: 'https://picsum.photos/350?random=1',
    status: 0,
    // price: new BigNumber(5),
    copies: '6',
    ProfileInfoProps: {
      subTitle: 'Owner',
      title: '1livinginzen',
      users: [
        {
          name: 'name',
          avatar: 'https://via.placeholder.com/32',
          verified: true,
        },
      ],
    },
  },
 {
    href: '#',
    title: 'Berserk - Red EthRanger #04 - Ruby Crystal Edition',
    img: 'https://picsum.photos/350?random=3',
    copies: '2',
    ProfileInfoProps: {
      subTitle: 'Owner',
      title: '1livinginzen',
      users: [
        {
          name: 'name',
          avatar: 'https://via.placeholder.com/32',
          verified: true,
        },
      ],
    },
  },
 {
    href: '#',
    title: 'Berserk - Red EthRanger #04 - Ruby Crystal Edition',
    img: 'https://picsum.photos/350?random=2',
    status: 1,
    copies: '1',
    ProfileInfoProps: {
      subTitle: 'Owner',
      title: '1livinginzen',
      users: [
        {
          name: 'name',
          avatar: 'https://via.placeholder.com/32',
          verified: true,
        },
      ],
    },
  },
 ];
 */

const brands: IBrandCardProps[] = [
  {
    href: '#',
    title: 'Polka Pet World',
    imgSrc: 'https://picsum.photos/120?random=10',
    itemsCount: 0,
  },
  {
    href: '#',
    title: 'Polka Pet World',
    imgSrc: 'https://picsum.photos/120?random=20',
    itemsCount: 20,
    itemsCount: 20,
  },
];

const followings: IFollowingItemProps[] = [
  {
    userName: 'Pasha Ho',
    userId: 123,
    href: '#',
    userFollowers: 150,
    imgSrc: 'https://picsum.photos/82?random=200',
    follow: false,
  },
  {
    userName: 'John Smith',
    userId: 321,
    href: '#',
    userFollowers: 0,
    imgSrc: 'https://picsum.photos/82?random=201',
    follow: true,
  },
  {
    userName: 'Smith John',
    userId: 213,
    href: '#',
    userFollowers: 15,
    imgSrc: 'https://picsum.photos/82?random=202',
    follow: false,
  },
];

const followers = followings;

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
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    if (address) {
      dispatchRequest(
        fetchAllNftByUser({
          user: address,
        }),
      );
    }
  }, [address, dispatchRequest]);
  const [tab, setTab] = useState<TabList>(TabList.items);

  const onTabsChange = useCallback((_, value) => {
    setTab(value);
  }, []);

  const tabs = useMemo(
    () => [
      {
        value: TabList.items,
        label: t('profile.tabs.my-items'),
      },
      {
        value: TabList.brands,
        label: t('profile.tabs.my-brands'),
      },
      {
        value: TabList.activity,
        label: t('profile.tabs.activity'),
      },
      {
        value: TabList.liked,
        label: t('profile.tabs.liked'),
        count: 0,
      },
      {
        value: TabList.following,
        label: t('profile.tabs.following'),
        count: 11,
      },
      {
        value: TabList.followers,
        label: t('profile.tabs.followers'),
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
          onChange={onTabsChange as any}
          value={tab}
        >
          {tabs.map(tabProps => (
            <Tab key={uid(tabProps)} {...tabProps} />
          ))}
        </Tabs>

        <TabPanel value={tab} index={TabList.items}>
          <TabItems>
            <Grid container spacing={4}>
              <Queries<IItem[]> requestActions={[fetchAllNftByUser]}>
                {({ data }) =>
                  data?.map((item: IItem) => (
                    <Grid item xs={12} sm={6} lg={4} xl={3} key={uid(item)}>
                      <ProductCard
                        key={uid(item)}
                        title={item.itemname}
                        href={'#'}
                        // status={item.status}
                        // UPDATE price
                        price={item.poolId ? new BigNumber(10) : undefined}
                        copies={'1'}
                        ImgProps={{
                          src: item.fileurl,
                          objectFit: 'scale-down',
                          loading: 'lazy',
                        }}
                        ProfileInfoProps={{
                          subTitle: 'Owner',
                          title: '1livinginzen',
                          users: [
                            {
                              name: 'name',
                              avatar: 'https://via.placeholder.com/32',
                              verified: true,
                            },
                          ],
                        }}
                        toSale={RoutesConfiguration.PublishNft.generatePath(
                          item.contractaddress,
                          item.id,
                        )}
                      />
                    </Grid>
                  ))
                }
              </Queries>
            </Grid>
          </TabItems>
        </TabPanel>

        <TabPanel value={tab} index={TabList.brands}>
          <TabBrands items={brands} />
        </TabPanel>

        <TabPanel value={tab} index={TabList.activity}>
          <ActivityTable />
        </TabPanel>

        <TabPanel value={tab} index={TabList.following}>
          <TabFollowing items={followings} />
        </TabPanel>

        <TabPanel value={tab} index={TabList.followers}>
          <TabFollowing items={followers} />
        </TabPanel>
      </Container>
    </Section>
  );
};
