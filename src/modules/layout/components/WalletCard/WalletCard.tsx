import React, { useEffect, useState } from 'react';
import { useWalletCardStyles } from './WalletCardStyles';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  Avatar,
  Box,
  IconButton,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { convertWallet } from 'modules/common/utils/convertWallet';
import { t } from 'modules/i18n/utils/intl';
import { DoneIcon } from 'modules/common/components/Icons/DoneIcon';
import { CopyIcon } from 'modules/common/components/Icons/CopyIcon';
import { Link as RouterLink } from 'react-router-dom';
import { ProfileRoutesConfig, ProfileTab } from 'modules/profile/ProfileRoutes';
import classNames from 'classnames';
import BigNumber from 'bignumber.js';

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
  const [isCopy, setCopy] = useState<boolean>(false);

  useEffect(() => {
    if (isCopy) {
      setTimeout(() => {
        setCopy(false);
        (document.activeElement as any)?.blur();
      }, 1000);
    }
  }, [isCopy]);

  return (
    <Box className={classes.root}>
      {name ? (
        <Box className={classes.row}>
          <Typography variant="h3" className={classes.name}>
            {name}
          </Typography>
        </Box>
      ) : null}

      {address ? (
        <Box className={classes.row}>
          <Typography variant="body1" className={classes.addressText}>
            {convertWallet(address)}

            <CopyToClipboard text={address} onCopy={() => setCopy(true)}>
              <Tooltip
                title={
                  isCopy ? t('common.copied') : t('common.copy-to-clipboard')
                }
                arrow
              >
                <IconButton size="small" className={classes.clipboardBtn}>
                  {isCopy ? (
                    <DoneIcon
                      className={classNames(
                        classes.clipboardBtnIcon,
                        classes.clipboardBtnIconDone,
                      )}
                    />
                  ) : (
                    <CopyIcon className={classes.clipboardBtnIcon} />
                  )}
                </IconButton>
              </Tooltip>
            </CopyToClipboard>
          </Typography>
        </Box>
      ) : null}

      {balance ? (
        <Box className={classes.row}>
          <Box className={classes.walletBalance}>
            {logo ? <Avatar src={logo} className={classes.walletLogo} /> : null}
            {t('unit.custom-unit', {
              value: balance.toFixed(),
              unit: currency,
            })}
          </Box>
        </Box>
      ) : null}

      <MenuList className={classes.menuList}>
        <MenuItem
          component={RouterLink}
          to={ProfileRoutesConfig.UserProfile.generatePath()}
          className={classes.menuItem}
          onClick={handleClose}
        >
          {t('header.inventory')}
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to={ProfileRoutesConfig.UserProfile.generatePath(ProfileTab.brands)}
          className={classes.menuItem}
          onClick={handleClose}
        >
          {t('header.brands')}
        </MenuItem>
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
