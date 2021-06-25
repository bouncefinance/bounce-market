import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { DefaultRandomAvatar } from 'modules/common/components/DefaultRandomAvatar';
import React from 'react';
import { Link } from 'react-router-dom';
import { VerifiedIcon } from './assets/VerifiedIcon';
import { useDropsOwnerStyles } from './useDropsOwnerStyles';

interface IDropsOwnerProps {
  title: string;
  className?: string;
  isVerified?: boolean;
  avatar?: string;
  href?: string;
}

export const DropsOwner = ({
  href,
  className,
  isVerified,
  avatar,
  title,
}: IDropsOwnerProps) => {
  const classes = useDropsOwnerStyles();

  const renderedContent = (
    <>
      <div className={classes.avatarBox}>
        <DefaultRandomAvatar className={classes.avatar} src={avatar} />

        {isVerified && <VerifiedIcon className={classes.verifiedIcon} />}
      </div>

      <Typography className={classes.title}>{title}</Typography>
    </>
  );

  const commonProps = {
    className: classNames(classes.root, className),
  };

  return href ? (
    <Link to={href} {...commonProps}>
      {renderedContent}
    </Link>
  ) : (
    <div {...commonProps}>{renderedContent}</div>
  );
};
