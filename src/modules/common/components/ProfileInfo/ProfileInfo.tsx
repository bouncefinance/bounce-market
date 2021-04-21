import { Avatar, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { uid } from 'react-uid';
import { useProfileInfoStyles } from './ProfileInfoStyles';

interface IUserInfo {
  name: string;
  avatar: string;
  href?: string;
  verified?: boolean;
}

export interface IProfileInfoProps {
  className?: string;
  subTitle: string;
  title: string;
  users: IUserInfo[];
  isTitleFirst?: boolean;
  avatarSize?: 'small' | 'medium' | 'big';
}

export const ProfileInfo = ({
  className,
  users,
  subTitle,
  title,
  isTitleFirst = false,
  avatarSize = 'small',
}: IProfileInfoProps) => {
  const classes = useProfileInfoStyles();

  const renderedAvatars = useMemo(() => {
    return users.map(({ name, avatar, verified, href }, i) => {
      const commonProps = {
        className: classes.avatarWrap,
        title: name,
        key: uid(name, i),
      };

      const renderedContent = (
        <>
          <Avatar
            className={classNames({
              [classes.avatarBig]: avatarSize === 'big',
              [classes.avatarMedium]: avatarSize === 'medium',
              [classes.avatarSmall]: avatarSize === 'small',
            })}
            src={avatar}
          />

          {verified && <i className={classes.avatarCheck} />}
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
        color="textSecondary"
        variant="body2"
        className={classes.subTitle}
      >
        {subTitle}
      </Typography>

      <Typography className={classes.title} variant="body2">
        {title}
      </Typography>
    </div>
  );
};
