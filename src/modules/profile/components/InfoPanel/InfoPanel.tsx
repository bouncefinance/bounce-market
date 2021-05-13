import {
  Box,
  ButtonBase,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { SocialShare } from 'modules/common/components/SocialShare';
import { CogIcon } from 'modules/common/components/Icons/CogIcon';
import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import { convertWallet } from 'modules/common/utils/convertWallet';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { t } from 'modules/i18n/utils/intl';
import { useInfoPanelStyles } from './useInfoPanelStyles';
import { ProfileRoutesConfig } from '../../ProfileRoutes';

interface IInfoPanelProps {
  name: string;
  url?: string;
  address?: string;
  subscribers?: ReactNode;
  social?: ReactNode;
}

// TODO: need receive profile user ID to url prop (now 1)
const urlForSharing =
  window.location.protocol +
  '//' +
  window.location.hostname +
  ProfileRoutesConfig.Profile.generatePath(1);

export const InfoPanel = ({
  name,
  url,
  address,
  subscribers,
  social,
}: IInfoPanelProps) => {
  const classes = useInfoPanelStyles();

  return (
    <Box mb={8}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm="auto">
          <Typography variant="h2">{name}</Typography>

          <Typography className={classes.url}>{url}</Typography>
        </Grid>

        <Grid item>
          <ButtonBase className={classes.address} title={address}>
            <Typography>{convertWallet(address || '')}</Typography>
          </ButtonBase>
        </Grid>

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

        <Grid item>
          <Link to={ProfileRoutesConfig.EditProfile.generatePath()}>
            <Tooltip title={t('profile.edit-profile')} arrow placement="right">
              <IconButton>
                <CogIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Grid>

        <Grid item xs={12} lg="auto" className={classes.linksCol}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>{subscribers}</Grid>

            <Grid item>{social}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
