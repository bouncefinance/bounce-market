import { Container } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { UploadFileType } from 'modules/common/actions/uploadFile';
import { Social } from 'modules/common/components/Social';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
// import { fetchActivitiesTable } from '../../actions/fetchActivitiesTable';
import { fetchOwned } from 'modules/profile/actions/fetchOwned';
import { fetchMySale } from 'modules/profile/actions/fetchSale';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { Avatar } from 'modules/profile/components/Avatar';
import { Bio } from 'modules/profile/components/Bio';
import { Header } from 'modules/profile/components/Header';
import { InfoPanel } from 'modules/profile/components/InfoPanel';
import { SetAvatarModal } from 'modules/profile/components/SetAvatarModal';
import { SetBgImgModal } from 'modules/profile/components/SetBgImgModal';
import { Subscribers } from 'modules/profile/components/Subscribers';
import { FollowGroup } from 'modules/profile/components/TabFollowing';
import { TabPanel } from 'modules/profile/components/TabPanel';
import { Tabs } from 'modules/profile/components/Tabs';
import { Tab } from 'modules/profile/components/Tabs/Tab';
import { ProfileRoutesConfig, ProfileTab } from 'modules/profile/ProfileRoutes';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { uid } from 'react-uid';
import { TabOwned } from './components/tabOwned';
import { TabSale } from './components/TabSale';
import { useCollectionStyles } from './useCollectionStyles';
import useCdnUrl from 'modules/common/hooks/useCdnUrl';
import {
  fetchCollectionInfoByAddress,
  ICollectionItem,
} from 'modules/profile/actions/fetchCollectionInfoByAddress';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';

export const Collection = () => {
  const {
    tab,
    address: collectionAddress,
  } = ProfileRoutesConfig.Collection.useParams();
  const [isAvatarModalOpened, setAvatarModalOpened] = useState(false);
  const [isBgImgModalOpened, setBgImgModalOpened] = useState(false);
  // const [bgImgSrc, setBgImgSrc] = useState('')
  const classes = useCollectionStyles();
  const { address } = useAccount();
  const { push } = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (collectionAddress) {
      dispatch(
        fetchCollectionInfoByAddress({
          collectionAddress: collectionAddress,
        }),
      );
    }
  }, [collectionAddress, dispatch]);

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  const { data: collectionInfo } = useQuery<ICollectionItem | null>({
    type: fetchCollectionInfoByAddress.toString(),
  });

  console.log('CollectionInfo', collectionInfo);

  const { imgSrc } = useCdnUrl(collectionInfo?.imgurl || ' ', 160);

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

  const updateData = useCallback(
    (value: ProfileTab) => {
      if (!address) {
        return;
      }
      switch (value) {
        case ProfileTab.owned: {
          dispatch(fetchOwned({ address }));
          break;
        }
        case ProfileTab.sells: {
          dispatch(fetchMySale({ address }));
          break;
        }
        default: {
          console.error('not match tab', value);
        }
      }
    },
    [address, dispatch],
  );

  const onTabsChange = useCallback(
    (_, value) => {
      push(ProfileRoutesConfig.UserProfile.generatePath(value));
      updateData(value);
    },
    [push, updateData],
  );

  useEffect(() => {
    updateData(tab);
  }, [updateData, tab]);

  const reload = (value: ProfileTab) => () => {
    setTimeout(() => {
      updateData(value);
    }, 100);
  };

  const tabs = useMemo(
    () => [
      {
        value: ProfileTab.sells,
        label: t('profile.tabs.my-sells'),
      },
      {
        value: ProfileTab.owned,
        label: t('profile.tabs.showcase'),
      },
    ],
    [],
  );

  const renderFollow = useCallback(() => {
    if (!address) return;
    return (
      <FollowGroup
        followAddress={address}
        followersCount={profileInfo?.followersCount}
        followingCount={profileInfo?.followingCount}
        black={true}
      />
    );
  }, [profileInfo, address]);

  return (
    <Section className={classes.root}>
      {/* 设置背景图片 */}
      <Header
        img={collectionInfo?.bandimgurl}
        onEditClick={toggleBgImgModal(true)}
      />

      <SetBgImgModal
        isOpen={isBgImgModalOpened}
        onClose={toggleBgImgModal(false)}
        fileType={UploadFileType.BrandImg}
        contractaddress={collectionInfo?.contractaddress}
      />

      <Container>
        <Avatar
          className={classes.avatar}
          src={imgSrc}
          onEditClick={toggleAvatarModal(true)}
          isEditable
          isVerified={profileInfo?.identity === 2}
        />

        <SetAvatarModal
          isOpen={isAvatarModalOpened}
          onClose={toggleAvatarModal(false)}
        />

        <InfoPanel
          isEditable
          withSharing={featuresConfig.ownProfileSharing}
          name={collectionInfo?.brandname}
          subscribers={
            featuresConfig.subscribers && (
              <Subscribers count={profileInfo?.followCount} />
            )
          }
          social={
            featuresConfig.profileSocialLinks && (
              <Social
                twitter={profileInfo?.twitter}
                instagram={profileInfo?.instagram}
                facebook={profileInfo?.facebook}
                website={profileInfo?.website}
              />
            )
          }
          follow={renderFollow()}
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

        <TabPanel value={tab} index={ProfileTab.owned}>
          <TabOwned />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.sells}>
          <TabSale reload={reload(ProfileTab.sells)} />
        </TabPanel>
      </Container>
    </Section>
  );
};
