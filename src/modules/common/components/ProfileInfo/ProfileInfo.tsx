import { Box } from '@material-ui/core';
import classNames from 'classnames';
import {
  INftCardHelpsParams,
  NftCardHelps,
} from 'modules/common/utils/nftCard';
import React, { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { uid } from 'react-uid';
import { DefaultRandomAvatar } from '../DefaultRandomAvatar';
import { NftCardTimer } from '../ProductCard/Timer';
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
  nftCardOption?: INftCardHelpsParams;
}

export const ProfileInfo = ({
  className,
  users,
  subTitle,
  title,
  isTitleFirst = false,
  avatarSize = 'small',
  mainHref,
  nftCardOption,
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

  const [nftCardHelps, setNftCardHelps] = useState<NftCardHelps>();
  useEffect(() => {
    if (nftCardOption) {
      setNftCardHelps(new NftCardHelps(nftCardOption));
    }
  }, [nftCardOption]);

  return (
    <Box
      className={classNames(className)}
      display="flex"
      justifyItems="center"
      justifyContent="space-between"
    >
      <div className={classes.avatars}>{renderedAvatars}</div>

      {nftCardHelps?.getIsAuctionLastTime() && nftCardOption?.closeAt && (
        <NftCardTimer endDate={nftCardOption?.closeAt} />
      )}
    </Box>
  );
};
