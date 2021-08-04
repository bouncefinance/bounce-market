import {
  Box,
  BoxProps,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { CopyToClip } from 'modules/common/components/CopyToClip';
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
  follow?: ReactNode;
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
  follow,
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
      <Grid
        container
        spacing={3}
        alignItems="center"
        className={classes.socialContainer}
      >
        {social && (
          <Grid className={classes.socialBox} item>
            {social}
          </Grid>
        )}
      </Grid>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm="auto">
          <Tooltip title={name} arrow placement="top">
            <Typography variant="h2">{truncateWalletAddr(name)}</Typography>
          </Tooltip>
          {email && <Typography className={classes.url}>{email}</Typography>}
        </Grid>

        {!isBrand && (
          <Grid item>
            <div className={classes.address}>
              {address && <CopyToClip address={address} />}
            </div>
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
            {<Grid item>{follow}</Grid>}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
