import {
  Box,
  BoxProps,
  ButtonBase,
  ClickAwayListener,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { CopyToClip } from 'modules/common/components/CopyToClip';
import { CogIcon } from 'modules/common/components/Icons/CogIcon';
import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import { ExtensionIcon } from 'modules/common/components/Icons/ExtensionIcon';
// import { VerticalDotsIcon } from 'modules/common/components/Icons/VerticalDotsIcon';
import { SocialShare } from 'modules/common/components/SocialShare';
import { truncateLongName } from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import React, { ReactNode, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProfileRoutesConfig } from '../../ProfileRoutes';
import { useInfoPanelStyles } from './useInfoPanelStyles';

interface IInfoPanelProps extends BoxProps {
  name?: string;
  email?: string;
  address?: string;
  collectionAddress?: string;
  subscribers?: ReactNode;
  social?: ReactNode;
  isCollection?: boolean;
  withSharing?: boolean;
  isEditable?: boolean;
  follow?: ReactNode;
  handelOpenRoyalty?: (collection: string) => void;
  handelOpenModifyDesc?: (collection: string) => void;
  profile?: ReactNode;
  collectionDesc?: string;
}

export const InfoPanel = ({
  name = 'Unnamed',
  email,
  address,
  collectionAddress,
  subscribers,
  social,
  isCollection,
  withSharing,
  isEditable,
  handelOpenRoyalty,
  handelOpenModifyDesc,
  follow,
  profile,
  collectionDesc,
  ...boxProps
}: IInfoPanelProps) => {
  const classes = useInfoPanelStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isPopoverOpened = Boolean(anchorEl);
  const urlForSharing =
    window.location.protocol +
    '//' +
    window.location.hostname +
    ProfileRoutesConfig.OtherProfile.generatePath(
      isCollection ? collectionAddress : address,
    );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Box mb={8} {...boxProps}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        className={social ? classes.socialContainer : ''}
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
            <Typography variant="h2">{truncateLongName(name)}</Typography>
          </Tooltip>
          {email && <Typography className={classes.url}>{email}</Typography>}
        </Grid>

        {!isCollection && (
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

        {isEditable &&
          (!isCollection ? (
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
          ) : (
            <>
              <ClickAwayListener onClickAway={() => {}}>
                <ButtonBase className={classes.menuBtn} onClick={handleClick}>
                  <ExtensionIcon className={classes.menuIcon} />
                </ButtonBase>
              </ClickAwayListener>
              <Popover
                open={isPopoverOpened}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  variant: 'outlined',
                }}
              >
                <MenuItem
                  className={classes.menuItem}
                  onClick={() => {
                    handleClose();
                    handelOpenModifyDesc &&
                      collectionAddress &&
                      handelOpenModifyDesc(collectionAddress);
                  }}
                >
                  {'Edit description'}
                </MenuItem>
                <MenuItem
                  className={classes.menuItem}
                  onClick={() => {
                    handleClose();
                    handelOpenRoyalty &&
                      collectionAddress &&
                      handelOpenRoyalty(collectionAddress);
                  }}
                >
                  {t('royalty.set-rayalty')}
                </MenuItem>
              </Popover>
            </>
          ))}

        <Grid item xs={12} lg="auto" className={classes.linksCol}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>{subscribers}</Grid>
            {<Grid item>{follow}</Grid>}
          </Grid>
        </Grid>

        <Grid item xs={12} lg={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>{profile}</Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
            className={classes.desc}
          >
            <Grid item xs={12}>
              {collectionDesc}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
