import { Container } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { UploadFileType } from 'modules/common/actions/uploadFile';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import {
  ILikedItem,
  queryLikedItems,
} from 'modules/profile/actions/queryLikedItems';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { uid } from 'react-uid';
import { fetchAllNftByUser } from '../../actions/fetchAllNftByUser';
import { fetchProfileInfo } from '../../actions/fetchProfileInfo';
import { IProfileInfo } from '../../api/profileInfo';
import { ActivityTable } from '../../components/ActivityTable';
import { Avatar } from '../../components/Avatar';
import { Bio } from '../../components/Bio';
import { Header } from '../../components/Header';
import { InfoPanel } from '../../components/InfoPanel';
import { SetAvatarModal } from '../../components/SetAvatarModal';
import { SetBgImgModal } from '../../components/SetBgImgModal';
import { Social } from '../../components/Social';
import { Subscribers } from '../../components/Subscribers';
import { TabBrands } from '../../components/TabBrands';
import {
  IFollowingItemProps,
  TabFollowing,
} from '../../components/TabFollowing';
import { TabPanel } from '../../components/TabPanel';
import { Tabs } from '../../components/Tabs';
import { Tab } from '../../components/Tabs/Tab';
import { ProfileRoutesConfig, ProfileTab } from '../../ProfileRoutes';
import { TabItems } from './components/TabItems';
import { TabLiked } from './components/TabLiked';
import { useProfileStyles } from './useProfileStyles';

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

export const Profile = () => {
  const { tab } = ProfileRoutesConfig.UserProfile.useParams();
  const [isAvatarModalOpened, setAvatarModalOpened] = useState(false);
  const [isBgImgModalOpened, setBgImgModalOpened] = useState(false);
  const classes = useProfileStyles();
  const { address } = useAccount();
  const dispatchRequest = useDispatchRequest();
  const { push } = useHistory();

  const { data: likedItems } = useQuery<ILikedItem[] | null>({
    type: queryLikedItems.toString(),
  });

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
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

  const onTabsChange = useCallback(
    (_, value) => {
      push(ProfileRoutesConfig.UserProfile.generatePath(value));
    },
    [push],
  );

  const tabs = useMemo(
    () => [
      {
        value: ProfileTab.items,
        label: t('profile.tabs.my-items'),
      },
      {
        value: ProfileTab.brands,
        label: t('profile.tabs.my-brands'),
      },
      ...(featuresConfig.profileActivity
        ? [
            {
              value: ProfileTab.activity,
              label: t('profile.tabs.activity'),
            },
          ]
        : []),
      ...(featuresConfig.nftLikes
        ? [
            {
              value: ProfileTab.liked,
              label: t('profile.tabs.liked'),
              count: likedItems ? likedItems.length : 0,
            },
          ]
        : []),
      ...(featuresConfig.profileFollowers
        ? [
            {
              value: ProfileTab.following,
              label: t('profile.tabs.following'),
              count: 0,
            },
            {
              value: ProfileTab.followers,
              label: t('profile.tabs.followers'),
              count: 0,
            },
          ]
        : []),
    ],
    [likedItems],
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
        fileType={UploadFileType.BgImg}
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
          withSharing={featuresConfig.ownProfileSharing}
          name={profileInfo?.username}
          email={profileInfo?.email}
          subscribers={
            featuresConfig.subscribers && (
              <Subscribers count={profileInfo?.followCount} />
            )
          }
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

        <TabPanel value={tab} index={ProfileTab.items}>
          <TabItems />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.brands}>
          <TabBrands />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.activity}>
          <ActivityTable />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.liked}>
          <TabLiked />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.following}>
          <TabFollowing items={followings} />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.followers}>
          <TabFollowing items={followers} />
        </TabPanel>
      </Container>
    </Section>
  );
};
