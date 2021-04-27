import {
  Box,
  ButtonBase,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { CogIcon } from 'modules/common/components/Icons/CogIcon';
import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import { convertWallet } from 'modules/common/utils/convertWallet';
import React, { ReactNode } from 'react';
import { useInfoPanelStyles } from './useInfoPanelStyles';

interface IInfoPanelProps {
  className?: string;
  name: string;
  url?: string;
  address?: string;
  subscribers?: ReactNode;
  social?: ReactNode;
}

export const InfoPanel = ({
  className,
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
          <ButtonBase className={classes.address} title={address} disableRipple>
            <Typography>{convertWallet(address || '')}</Typography>
          </ButtonBase>
        </Grid>

        <Grid item>
          <IconButton title="Share">
            <ShareIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton title="Settings">
            <CogIcon />
          </IconButton>
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
