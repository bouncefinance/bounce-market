import { Avatar, Box, Typography } from '@material-ui/core';
import { UserIcon } from 'modules/common/components/Icons/UserIcon';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { uid } from 'react-uid';
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
                onClick={() => {}}
                className={classes.followButton}
                variant="outlined"
                fullWidth={false}
                rounded
              >
                {t('profile.unfollow')}
              </Button>
            ) : (
              <Button
                onClick={() => {}}
                className={classes.followButton}
                variant="outlined"
                fullWidth={false}
                rounded
              >
                {t('profile.follow')}
              </Button>
            )}
          </div>
        </div>
      )),
    [items, classes],
  );

  return <div className={classes.root}>{renderListItems}</div>;
};
