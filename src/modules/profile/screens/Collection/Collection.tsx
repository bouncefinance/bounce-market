import { Container } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { UploadFileType } from 'modules/common/actions/uploadFile';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
// import { fetchActivitiesTable } from '../../actions/fetchActivitiesTable';
import { fetchOwned } from 'modules/profile/actions/fetchOwned';
import { fetchMySale } from 'modules/profile/actions/fetchSale';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { Avatar } from 'modules/profile/components/Avatar';
import { Header } from 'modules/profile/components/Header';
import { InfoPanel } from 'modules/profile/components/InfoPanel';
import {
  AvatarType,
  SetAvatarModal,
} from 'modules/profile/components/SetAvatarModal';
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
import { RoyaltyDialog } from 'modules/brand/components/RoyaltyDialog';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { UserRoleEnum } from 'modules/common/actions/queryAccountInfo';
import { CollectionDescDialog } from './components/CollectionDescDialog';

export const Collection = () => {
  const {
    tab,
    address: collectionAddress,
  } = ProfileRoutesConfig.Collection.useParams();
  const [isAvatarModalOpened, setAvatarModalOpened] = useState(false);
  const [isBgImgModalOpened, setBgImgModalOpened] = useState(false);
  const [isMyCollection, setIsMyCollection] = useState(false);
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

  // 控制 Royalty 板块
  const [royaltyOpen, setRoyaltyOpen] = useState(false);
  const [collection, setCollection] = useState('');
  const handelOpenRoyalty: (collection: string) => void = collection => {
    setCollection(collection);
    setRoyaltyOpen(!royaltyOpen);
  };

  // 控制修改 Desc 板块
  const [modifyDescOpen, setModifyDescOpen] = useState(false);
  const handelOpenModifyDesc: (collection: string) => void = collection => {
    setCollection(collection);
    setModifyDescOpen(!modifyDescOpen);
  };

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  const { data: collectionInfo } = useQuery<ICollectionItem | null>({
    type: fetchCollectionInfoByAddress.toString(),
  });

  useEffect(() => {
    if (!address) return;
    const isMyCollection =
      String(address).toLowerCase() ===
      String(collectionInfo?.owneraddress).toLowerCase();
    setIsMyCollection(isMyCollection);
  }, [address, collectionInfo]);

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
        followAddress={collectionInfo?.owneraddress || ''}
        followersCount={collectionInfo?.followerscount || 0}
        followingCount={collectionInfo?.followingcount || 0}
        black={true}
      />
    );
  }, [collectionInfo, address]);

  return (
    <Section className={classes.root}>
      {/* 设置背景图片 */}
      <Header
        img={collectionInfo?.bandimgurl}
        onEditClick={toggleBgImgModal(true)}
        isHiddenCustom={!isMyCollection}
      />

      {isMyCollection && (
        <SetBgImgModal
          isOpen={isBgImgModalOpened}
          onClose={toggleBgImgModal(false)}
          fileType={UploadFileType.BrandImg}
          contractaddress={collectionInfo?.contractaddress}
        />
      )}

      <Container>
        <Avatar
          className={classes.avatar}
          src={imgSrc}
          onEditClick={toggleAvatarModal(true)}
          isEditable={isMyCollection}
          isVerified={profileInfo?.identity === 2}
        />

        {isMyCollection && (
          <SetAvatarModal
            isOpen={isAvatarModalOpened}
            onClose={toggleAvatarModal(false)}
            avatarType={AvatarType.Collection}
            collectionAvatar={collectionInfo?.imgurl}
            collectionAddress={collectionAddress}
          />
        )}

        <InfoPanel
          isEditable={isMyCollection}
          withSharing={featuresConfig.ownProfileSharing}
          name={collectionInfo?.brandname}
          subscribers={
            featuresConfig.subscribers && (
              <Subscribers count={profileInfo?.followCount} />
            )
          }
          follow={renderFollow()}
          address={address}
          isCollection={true}
          collectionAddress={collectionAddress}
          handelOpenRoyalty={handelOpenRoyalty}
          handelOpenModifyDesc={handelOpenModifyDesc}
          profile={
            <ProfileInfo
              subTitle={t('details-nft.role.minter')}
              title={
                collectionInfo?.ownername ??
                truncateWalletAddr(collectionInfo?.owneraddress || '')
              }
              users={[
                {
                  href: ProfileRoutesConfig.OtherProfile.generatePath(
                    collectionInfo?.owneraddress,
                  ),
                  name:
                    collectionInfo?.ownername ??
                    truncateWalletAddr(collectionInfo?.owneraddress || ''),
                  avatar: collectionInfo?.ownerimg,
                  verified: collectionInfo?.identity === UserRoleEnum.Verified,
                  address: collectionInfo?.owneraddress,
                },
              ]}
            />
          }
          collectionDesc={collectionInfo?.description}
        />

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

      <RoyaltyDialog
        isOpen={royaltyOpen}
        onClose={() => {
          setRoyaltyOpen(false);
        }}
        collection={collection}
      />

      <CollectionDescDialog
        isOpen={modifyDescOpen}
        onClose={() => {
          setModifyDescOpen(false);
        }}
        collection={collectionAddress}
        description={collectionInfo?.description || ''}
      />
    </Section>
  );
};
