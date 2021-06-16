import {
  Box,
  BoxProps,
  ButtonBase,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { CogIcon } from 'modules/common/components/Icons/CogIcon';
import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import { SocialShare } from 'modules/common/components/SocialShare';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ProfileRoutesConfig } from '../../ProfileRoutes';
import { useInfoPanelStyles } from './useInfoPanelStyles';

interface IInfoPanelProps extends BoxProps {
  name?: string;
  email?: string;
  address?: string;
  subscribers?: ReactNode;
  social?: ReactNode;
  isBrand?: boolean;
  withSharing?: boolean;
  isEditable?: boolean;
}

export const InfoPanel = ({
  name = 'Unnamed',
  email,
  address,
  subscribers,
  social,
  isBrand,
  withSharing,
  isEditable,
  ...boxProps
}: IInfoPanelProps) => {
  const classes = useInfoPanelStyles();
  const urlForSharing =
    window.location.protocol +
    '//' +
    window.location.hostname +
    ProfileRoutesConfig.OtherProfile.generatePath(address);

  return (
    <Box mb={8} {...boxProps}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm="auto">
          <Typography variant="h2">{name}</Typography>

          {email && <Typography className={classes.url}>{email}</Typography>}
        </Grid>

        {!isBrand && (
          <Grid item>
            <ButtonBase className={classes.address} title={address}>
              <Typography>{truncateWalletAddr(address || '')}</Typography>
            </ButtonBase>
          </Grid>
        )}

        {withSharing && (
          <Grid item>
            <Tooltip title={t('social.share')} arrow placement="left">
              <Box>
                <SocialShare
                  titleString={name}
                  url={urlForSharing}
                  buttonContent={
                    <IconButton>
                      <ShareIcon />
                    </IconButton>
                  }
                />
              </Box>
            </Tooltip>
          </Grid>
        )}

        {isEditable && (
          <Grid item>
            <Link to={ProfileRoutesConfig.EditProfile.generatePath()}>
              <Tooltip
                title={t('profile.edit-profile')}
                arrow
                placement="right"
              >
                <IconButton>
                  <CogIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Grid>
        )}

        <Grid item xs={12} lg="auto" className={classes.linksCol}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>{subscribers}</Grid>

            {social && <Grid item>{social}</Grid>}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
