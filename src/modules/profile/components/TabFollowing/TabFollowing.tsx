import { Avatar, Box, Typography } from '@material-ui/core';
import { UserIcon } from 'modules/common/components/Icons/UserIcon';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { uid } from 'react-uid';
import { AddFollowIcon } from './assets/AddFollowIcon';
import { CheckmarkIcon } from './assets/CheckmarkIcon';
import { useTabFollowingStyles } from './useTabFollowingStyles';

export interface IFollowingItemProps {
  userName: string;
  userId: number;
  href: string;
  userFollowers: number;
  imgSrc: string;
  follow: boolean;
}

interface ITabFollowingProps {
  items?: IFollowingItemProps[];
}

export const TabFollowing = ({ items }: ITabFollowingProps) => {
  const classes = useTabFollowingStyles();
  const [isCancelFollowIndex, setIsCancelFollowIndex] = useState(0);

  const renderListItems = useMemo(
    () =>
      items?.map(item => (
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
                  {item.userName}
                </Typography>

                {item.userFollowers ? (
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    className={classes.userFollowers}
                  >
                    <UserIcon className={classes.userFollowersIcon} />

                    {item.userFollowers}
                  </Typography>
                ) : null}
              </Link>
            </Box>
          </div>

          <div className={classes.itemFollowWrap}>
            {item.follow ? (
              <Button
                className={classes.followButton}
                rounded
                onMouseEnter={() => {
                  setIsCancelFollowIndex(item.userId);
                }}
                onMouseLeave={() => {
                  setIsCancelFollowIndex(0);
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
                onClick={() => {}}
                className={classes.followButton}
                variant="outlined"
                fullWidth={false}
                rounded
              >
                <AddFollowIcon className={classes.addIcon} />
                {t('profile.follow.follow')}
              </Button>
            )}
          </div>
        </div>
      )),
    [items, classes, isCancelFollowIndex],
  );

  return <div className={classes.root}>{renderListItems}</div>;
};
