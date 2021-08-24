import React, { useMemo } from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { uid } from 'react-uid';
import { DefaultRandomAvatar } from '../DefaultRandomAvatar';
import { useProfileInfoStyles } from './ProfileInfoStyles';

interface IUserInfo {
  name: string;
  avatar?: string;
  href?: string;
  verified?: boolean;
  address?: string;
}

export interface IProfileInfoProps {
  className?: string;
  subTitle: string;
  title: string;
  users: IUserInfo[];
  /**
   * Display title at first
   */
  isTitleFirst?: boolean;
  /**
   * default size is - small
   */
  avatarSize?: 'small' | 'medium' | 'big';
  mainHref?: string;
}

export const ProfileInfo = ({
  className,
  users,
  subTitle,
  title,
  isTitleFirst = false,
  avatarSize = 'small',
  mainHref,
}: IProfileInfoProps) => {
  const classes = useProfileInfoStyles();

  const renderedAvatars = useMemo(() => {
    return users.map(({ name, avatar, verified, href, address }, i) => {
      const commonProps = {
        className: classes.avatarWrap,
        title: name,
        key: uid(name, i),
      };

      const renderedContent = (
        <>
          <DefaultRandomAvatar
            className={classNames({
              [classes.avatarBig]: avatarSize === 'big',
              [classes.avatarMedium]: avatarSize === 'medium',
              [classes.avatarSmall]: avatarSize === 'small',
            })}
            src={avatar}
            address={address}
            verified={verified}
          />
        </>
      );

      return href ? (
        <Link {...commonProps} to={href}>
          {renderedContent}
        </Link>
      ) : (
        <div {...commonProps}>{renderedContent}</div>
      );
    });
  }, [avatarSize, classes, users]);

  return (
    <div
      className={classNames(
        className,
        classes.root,
        isTitleFirst && classes.titleFirst,
      )}
    >
      <div className={classes.avatars}>{renderedAvatars}</div>

      <Typography
        component={!!mainHref ? Link : 'div'}
        to={mainHref || '#'}
        color="textSecondary"
        variant="body2"
        className={classes.subTitle}
      >
        {subTitle}
      </Typography>

      <Typography
        component={!!mainHref ? Link : 'div'}
        to={mainHref || '#'}
        className={classes.title}
        variant="body2"
      >
        {title}
      </Typography>
    </div>
  );
};
