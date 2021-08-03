import { Avatar, Box, Typography } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { UserIcon } from 'modules/common/components/Icons/UserIcon';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import {
  fetchFollowersList,
  fetchFollowingList,
  IFollowListItem,
} from 'modules/profile/actions/fetchFollowersList';
import { ToggleFollowType } from 'modules/profile/actions/toggleFollow';
import { Button } from 'modules/uiKit/Button';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { uid } from 'react-uid';
import { FollowType } from '.';
import { AddFollowIcon } from './assets/AddFollowIcon';
import { CheckmarkIcon } from './assets/CheckmarkIcon';
import { useFollow } from './useFollow';
import { useTabFollowingStyles } from './useTabFollowingStyles';

interface ITabFollowingProps {
  followAddress: string;
  accountaddress: string;
  renderType: FollowType;
  setFollowingCount: (num: number) => void;
}

export const TabFollowing = ({
  followAddress,
  accountaddress,
  renderType,
  setFollowingCount,
}: ITabFollowingProps) => {
  const classes = useTabFollowingStyles();
  const [isCancelFollowIndex, setIsCancelFollowIndex] = useState('');
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const [renderList, setRenderList] = useState<IFollowListItem[]>([]);

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

  const { data: followersListData } = useQuery<IFollowListItem[]>({
    type: fetchFollowersList.toString(),
  });

  const { data: followingListData } = useQuery<IFollowListItem[]>({
    type: fetchFollowingList.toString(),
  });

  useEffect(() => {
    if (renderType === FollowType.Followers) {
      return setRenderList(followersListData);
    }
    setRenderList(followingListData);
  }, [renderType, followersListData, followingListData]);

  const onSubmitFollow = useCallback(
    (payload: any, index: number) => {
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
        })
        .catch(() => {});
    },
    [renderList, onFollowClick, setFollowingCount],
  );

  const renderListItems = useMemo(
    () =>
      renderList?.map((item, index) => (
        <div className={classes.item} key={uid(item)}>
          <div className={classes.itemContentWrap}>
            <Link to={item.href} className={classes.itemAvatarLink}>
              <Avatar
                alt={item.userName}
                src={item.imgSrc}
                className={classes.itemAvatar}
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
              <Button disabled rounded className={classes.followButton}>
                My Self
              </Button>
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
                {!(isCancelFollowIndex === item.userId) && (
                  <CheckmarkIcon className={classes.addIcon} />
                )}
                {isCancelFollowIndex === item.userId
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
      )),
    [renderList, classes, isCancelFollowIndex, accountaddress, onSubmitFollow],
  );

  const NullList = () => {
    return (
      <div className={classes.listNull}>
        <h3>List Is Null</h3>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      {renderList?.length ? renderListItems : <NullList />}
    </div>
  );
};
