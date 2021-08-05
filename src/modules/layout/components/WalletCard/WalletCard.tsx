import { Avatar, Box, MenuItem, MenuList, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { CopyToClip } from 'modules/common/components/CopyToClip';
import { t } from 'modules/i18n/utils/intl';
import {
  defaultProfileTab,
  ProfileRoutesConfig,
} from 'modules/profile/ProfileRoutes';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useWalletCardStyles } from './WalletCardStyles';
import Truncate from 'react-truncate';

const ENABLE_CURRENCY_ICON = false;

export interface IWalletCardProps {
  address: string;
  balance?: BigNumber;
  logo?: string;
  currency?: string;
  name?: string;
  handleDisconnect?: () => void;
  handleClose?: () => void;
}

export const WalletCard = ({
  address,
  balance,
  logo = '',
  currency = '',
  name,
  handleDisconnect,
  handleClose,
}: IWalletCardProps) => {
  const classes = useWalletCardStyles();

  return (
    <Box className={classes.root}>
      {name ? (
        <Box className={classes.row}>
          <Typography variant="h3" className={classes.name}>
            <Truncate lines={3}>{name}</Truncate>
          </Typography>
        </Box>
      ) : null}

      {address && (
        <Box className={classes.row}>
          <CopyToClip address={address} />
        </Box>
      )}

      {balance ? (
        <Box className={classes.row}>
          <Box className={classes.walletBalance}>
            {logo && ENABLE_CURRENCY_ICON ? (
              <Avatar src={logo} className={classes.walletLogo} />
            ) : null}
            {t('unit.custom-unit', {
              value: balance.toFixed(3, 1),
              unit: currency,
            })}
          </Box>
        </Box>
      ) : null}

      <MenuList className={classes.menuList}>
        <MenuItem
          component={RouterLink}
          to={ProfileRoutesConfig.UserProfile.generatePath(defaultProfileTab)}
          className={classes.menuItem}
          onClick={handleClose}
        >
          {t('header.inventory')}
        </MenuItem>
        {/* <MenuItem
          component={RouterLink}
          to={ProfileRoutesConfig.UserProfile.generatePath(ProfileTab.brands)}
          className={classes.menuItem}
          onClick={handleClose}
        >
          {t('header.my-collections')}
        </MenuItem> */}
        <MenuItem
          component={RouterLink}
          to={ProfileRoutesConfig.EditProfile.generatePath()}
          className={classes.menuItem}
          onClick={handleClose}
        >
          {t('header.profile-settings')}
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleDisconnect}>
          {t('header.disconnect')}
        </MenuItem>
      </MenuList>
    </Box>
  );
};
