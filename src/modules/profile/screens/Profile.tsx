import { Container, Grid } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useAccount } from 'modules/account/hooks/useAccount';
import { IBrandCardProps } from 'modules/brand/components/BrandCard';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { uid } from 'react-uid';
import { ProductCard } from '../../common/components/ProductCard';
import { Queries } from '../../common/components/Queries/Queries';
import { RoutesConfiguration } from '../../createNFT/Routes';
import { IItem } from '../../overview/api/getItems';
import { fetchAllNftByUser } from '../actions/fetchAllNftByUser';
import { fetchProfileInfo } from '../actions/fetchProfileInfo';
import { IProfileInfo } from '../api/profileInfo';
import { ActivityTable } from '../components/ActivityTable';
import { Avatar } from '../components/Avatar';
import { Bio } from '../components/Bio';
import { Header } from '../components/Header';
import { InfoPanel } from '../components/InfoPanel';
import { NoItems } from '../components/NoItems';
import { SetAvatarModal } from '../components/SetAvatarModal';
import { SetBgImgModal } from '../components/SetBgImgModal';
import { Social } from '../components/Social';
import { Subscribers } from '../components/Subscribers';
import { TabBrands } from '../components/TabBrands';
import { IFollowingItemProps, TabFollowing } from '../components/TabFollowing';
import { TabItems } from '../components/TabItems';
import { TabPanel } from '../components/TabPanel';
import { Tabs } from '../components/Tabs';
import { Tab } from '../components/Tabs/Tab';
import { useProfileStyles } from './useProfileStyles';

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
  const [tab, setTab] = useState<TabList>(TabList.items);
  const [isAvatarModalOpened, setAvatarModalOpened] = useState(false);
  const [isBgImgModalOpened, setBgImgModalOpened] = useState(false);
  const classes = useProfileStyles();
  const { address } = useAccount();
  const dispatchRequest = useDispatchRequest();

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  const allNftByUserQuery = useQuery<IItem[] | null>({
    type: fetchAllNftByUser.toString(),
  });

  const toggleAvatarModal = useCallback(
    (isOpen: boolean) => () => {
      setAvatarModalOpened(isOpen);
    },
    [],
  );

  const toggleBgImgModal = useCallback(
    (isOpen: boolean) => () => {
      setBgImgModalOpened(isOpen);
    },
    [],
  );

  useEffect(() => {
    if (address) {
      dispatchRequest(
        fetchAllNftByUser({
          user: address,
        }),
      );
    }
  }, [address, dispatchRequest]);

  const onTabsChange = useCallback((_, value) => {
    setTab(value);
  }, []);

  const hasItems =
    !!allNftByUserQuery.data && allNftByUserQuery.data.length > 0;

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
      <Header
        img={profileInfo?.bgImgUrl}
        onEditClick={toggleBgImgModal(true)}
      />

      <SetBgImgModal
        isOpen={isBgImgModalOpened}
        onClose={toggleBgImgModal(false)}
      />

      <Container>
        <Avatar
          className={classes.avatar}
          src={profileInfo?.imgUrl}
          onEditClick={toggleAvatarModal(true)}
          isEditable
        />

        <SetAvatarModal
          isOpen={isAvatarModalOpened}
          onClose={toggleAvatarModal(false)}
        />

        <InfoPanel
          name={profileInfo?.username}
          email={profileInfo?.email}
          subscribers={<Subscribers count={profileInfo?.followCount} />}
          // https://ankrnetwork.atlassian.net/browse/FE-3449
          // TODO: [FE-3449] add social links after it will be implemented on backend side
          social={featuresConfig.profileSocialLinks && <Social />}
          address={address}
        />

        {profileInfo?.bio && <Bio>{profileInfo.bio}</Bio>}

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
          {hasItems || allNftByUserQuery.loading ? (
            <TabItems>
              <Grid container spacing={4}>
                <Queries<IItem[]> requestActions={[fetchAllNftByUser]}>
                  {({ data }) =>
                    data?.map((item: IItem) => (
                      <Grid item xs={12} sm={6} lg={4} xl={3} key={uid(item)}>
                        <ProductCard
                          key={uid(item)}
                          title={item.itemName}
                          href={
                            item.poolId && item.poolType
                              ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
                                  item.poolId,
                                  item.poolType,
                                )
                              : ''
                          }
                          // status={item.status}
                          // UPDATE price
                          price={item.poolId ? new BigNumber(10) : undefined}
                          copies={item.supply}
                          MediaProps={{
                            category: item.category,
                            src: item.fileUrl,
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
                            item.contractAddress,
                            item.id,
                          )}
                        />
                      </Grid>
                    ))
                  }
                </Queries>
              </Grid>
            </TabItems>
          ) : (
            <NoItems />
          )}
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
