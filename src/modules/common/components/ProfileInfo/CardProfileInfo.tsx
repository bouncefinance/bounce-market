import { Box, Tooltip, Typography } from '@material-ui/core';
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
  typLabel?: string;
}

interface IProfileInfoProps {
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

export const CardProfileInfo = ({
  className,
  users,
  title,
  avatarSize = 'small',
  nftCardOption,
}: IProfileInfoProps) => {
  const classes = useProfileInfoStyles();

  const renderedAvatars = useMemo(() => {
    return users.map((props, i) => {
      const { name, avatar, verified, href, address, typLabel } = props;
      const commonProps = {
        className: classes.cardAvatarWrap,
        key: uid(props, i),
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
            verified={verified ?? false}
          />
        </>
      );

      return (
        <Tooltip
          key={uid(props, i)}
          title={`${typLabel}: ${name || '--'}`}
          arrow
          placement="top"
          classes={{
            tooltip: classes.avatarTips,
            arrow: classes.avatarTipsText,
          }}
        >
          {href ? (
            <Link {...commonProps} to={href}>
              {renderedContent}
            </Link>
          ) : (
            <div {...commonProps}>{renderedContent}</div>
          )}
        </Tooltip>
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
    <>
      <Box
        className={classNames(className)}
        display="flex"
        justifyItems="center"
        justifyContent="space-between"
        onClick={e => e.stopPropagation()}
      >
        <div className={classes.avatars}>{renderedAvatars}</div>

        {nftCardHelps?.getIsAuctionLastTime() && nftCardOption?.closeAt && (
          <NftCardTimer endDate={nftCardOption?.closeAt} />
        )}
      </Box>
      <Typography variant="h5" className={classes.nftTitle} title={title}>
        {title}
      </Typography>
    </>
  );
};
