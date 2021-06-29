import classNames from 'classnames';
import React from 'react';
import { useProfileInfoStyles } from './ProfileInfoStyles';
import {Skeleton} from "@material-ui/lab";

export interface IProfileInfoPropsSkeleton {
  className?: string;
  avatarSize?: 'small' | 'medium' | 'big';
}

export const ProfileInfoSkeleton = ({
  className,
  avatarSize = 'small',
}: IProfileInfoPropsSkeleton) => {
  const classes = useProfileInfoStyles();

  const avatarStyle = classNames({
    [classes.avatarBig]: avatarSize === 'big',
    [classes.avatarMedium]: avatarSize === 'medium',
    [classes.avatarSmall]: avatarSize === 'small',
  }) ;

  return (
    <div
      className={classNames(
        className,
        classes.root
      )}
    >
      <div className={classes.avatars}>
        <Skeleton className={avatarStyle} variant="rect" />
      </div>

      <Skeleton className={classes.subTitle} variant="text" />

      <Skeleton className={classes.title} variant="text" />
    </div>
  );
};
