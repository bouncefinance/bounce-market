import {
  Box,
  BoxProps,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { CopyToClicp } from 'modules/common/components/CopyToClip/CopyToClip';
import { CogIcon } from 'modules/common/components/Icons/CogIcon';
import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import { SocialShare } from 'modules/common/components/SocialShare';
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
}

// TODO: need receive profile user ID to url prop (now 1)
const urlForSharing =
  window.location.protocol +
  '//' +
  window.location.hostname +
  ProfileRoutesConfig.Profile.generatePath('1');

export const InfoPanel = ({
  name = 'Unnamed',
  email,
  address,
  subscribers,
  social,
  isBrand,
  withSharing,
  ...boxProps
}: IInfoPanelProps) => {
  const classes = useInfoPanelStyles();

  return (
    <Box mb={8} {...boxProps}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm="auto">
          <Typography variant="h2">{name}</Typography>

          {email && <Typography className={classes.url}>{email}</Typography>}
        </Grid>

        {!isBrand && (
          <Grid item>
            <div className={classes.address}>
              {address && <CopyToClicp address={address} />}
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

        {!isBrand && (
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
