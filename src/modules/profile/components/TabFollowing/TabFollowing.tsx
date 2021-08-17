import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/types/ResponseData';
import {
  fetchFollowersList,
  fetchFollowingList,
  IFollowListItem,
} from 'modules/profile/actions/fetchFollowersList';
import { Avatar, Box, Typography } from '@material-ui/core';
import { FollowType } from '.';
import { useTabFollowingStyles } from './useTabFollowingStyles';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatchRequest } from '@redux-requests/react';
import { useDispatch } from 'react-redux';
import { useFollow } from './useFollow';
import { resetRequests } from '@redux-requests/core';
import { Link } from 'react-router-dom';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { UserIcon } from 'modules/common/components/Icons/UserIcon';
import { Button } from 'modules/uiKit/Button';
import { CheckmarkIcon } from './assets/CheckmarkIcon';
import { t } from 'modules/i18n/utils/intl';
import { AddFollowIcon } from './assets/AddFollowIcon';
import { uid } from 'react-uid';
import { ToggleFollowType } from 'modules/profile/actions/toggleFollow';
import { useAccount } from 'modules/account/hooks/useAccount';
import { DefaultRandomAvatar } from 'modules/common/components/DefaultRandomAvatar';

interface ITabFollowingProps {
  followAddress: string;
  accountaddress: string;
  renderType: FollowType;
  setFollowingCount: (num: number) => void;
  onClose: () => void;
}

export const TabFollowing = ({
  followAddress,
  accountaddress,
  renderType,
  setFollowingCount,
  onClose,
}: ITabFollowingProps) => {
  const classes = useTabFollowingStyles();
  const [isCancelFollowIndex, setIsCancelFollowIndex] = useState('');
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const [renderList, setRenderList] = useState<IFollowListItem[]>([]);
  const { handleConnect } = useAccount();
  const { onFollowClick } = useFollow({ followAddress });

  useEffect(() => {
    if (followAddress) {
      dispatchRequest(
        fetchFollowersList({
          targetaddress: followAddress,
          accountaddress: accountaddress,
        }),
      );

      dispatchRequest(
        fetchFollowingList({
          targetaddress: followAddress,
          accountaddress: accountaddress,
        }),
      );
    }

    return function reset() {
      dispatch(
        resetRequests([
          fetchFollowersList.toString(),
          fetchFollowingList.toString(),
        ]),
      );
    };
  }, [followAddress, accountaddress, dispatch, dispatchRequest]);

  const onSubmitFollow = useCallback(
    (payload: any, index: number) => {
      // if user not connect wallet
      if (!accountaddress) {
        onClose();
        setTimeout(handleConnect, 200);
        return;
      }

      onFollowClick(payload)
        .then(async res => {
          const cloneRenderList = [...renderList];
          cloneRenderList[index] = {
            ...renderList[index],
            userFollowers: res.followersCount,
            follow: !(payload.state === ToggleFollowType.Following),
            followState:
              payload.state === ToggleFollowType.Following
                ? ToggleFollowType.UnFollow
                : ToggleFollowType.Following,
          };
          setRenderList(cloneRenderList);
          setFollowingCount(res.myfollowingCount);
          setIsCancelFollowIndex('');
        })
        .catch(() => {});
    },
    [
      renderList,
      onFollowClick,
      accountaddress,
      setFollowingCount,
      onClose,
      handleConnect,
    ],
  );
  const renderListItems = useMemo(() => {
    return renderList?.map((item, index) => (
      <div className={classes.item} key={uid(item)}>
        <div className={classes.itemContentWrap}>
          <Link to={item.href} className={classes.itemAvatarLink}>
            <DefaultRandomAvatar
              className={classes.itemAvatar}
              src={item.imgSrc}
              address={item.followerAddress}
            />
          </Link>

          <Box className={classes.itemContent}>
            <Link to={item.href} className={classes.itemUserNameLink}>
              <Typography
                variant="h5"
                className={classes.itemName}
                title={item.userName}
              >
                {truncateWalletAddr(item.userName)}
              </Typography>

              <Typography
                color="textSecondary"
                variant="body2"
                className={classes.userFollowers}
              >
                <UserIcon className={classes.userFollowersIcon} />

                {item.userFollowers}
              </Typography>
            </Link>
          </Box>
        </div>

        <div className={classes.itemFollowWrap}>
          {String(item.userId).toLowerCase() ===
          String(accountaddress).toLowerCase() ? (
            // <Button disabled rounded className={classes.followButton}>
            //   {t('profile.follow.my-self')}
            // </Button>
            <></>
          ) : item.follow ? (
            <Button
              className={classes.followButton}
              rounded
              onMouseEnter={() => {
                setIsCancelFollowIndex(item.userId);
              }}
              onMouseLeave={() => {
                setIsCancelFollowIndex('');
              }}
              onClick={() => {
                onSubmitFollow(
                  {
                    tarAddress: item.userId,
                    account: accountaddress,
                    state: item.followState,
                  },
                  index,
                );
              }}
            >
              {!(item.userId && isCancelFollowIndex === item.userId) && (
                <CheckmarkIcon className={classes.addIcon} />
              )}
              {item.userId && isCancelFollowIndex === item.userId
                ? t('profile.follow.unfollow')
                : t('profile.follow.following')}
            </Button>
          ) : (
            <Button
              className={classes.followButton}
              variant="outlined"
              fullWidth={false}
              rounded
              onClick={() => {
                onSubmitFollow(
                  {
                    tarAddress: item.userId,
                    account: accountaddress,
                    state: item.followState,
                  },
                  index,
                );
              }}
            >
              <AddFollowIcon className={classes.addIcon} />
              {t('profile.follow.follow')}
            </Button>
          )}
        </div>
      </div>
    ));
  }, [
    renderList,
    classes,
    isCancelFollowIndex,
    accountaddress,
    onSubmitFollow,
  ]);

  const NullList = () => {
    return (
      <div className={classes.listNull}>
        <h3>{t('profile.follow.no-list')}</h3>
      </div>
    );
  };

  return (
    <div className="root">
      {
        <Queries<
          ResponseData<typeof fetchFollowersList>,
          ResponseData<typeof fetchFollowersList>
        >
          requestActions={[fetchFollowersList, fetchFollowingList]}
          empty={<NullList />}
        >
          {({ data: followersListData }, { data: followingListData }) => {
            if (renderType === FollowType.Followers) {
              if (followersListData.length === 0) {
                return <NullList />;
              }

              if (!renderList.length) {
                setRenderList(followersListData);
              }
            } else {
              if (followingListData.length === 0) {
                return <NullList />;
              }

              if (!renderList.length) {
                setRenderList(followingListData);
              }
            }
            return renderListItems;
          }}
        </Queries>
      }
    </div>
  );
};
