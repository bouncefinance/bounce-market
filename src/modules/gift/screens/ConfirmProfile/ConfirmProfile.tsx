import React from 'react';
import {
  Box,
  Button,
  Grid,
  Tooltip,
  Typography,
  InputBase,
  OutlinedInput,
  InputLabel,
} from '@material-ui/core';
import { useConfirmProfileStyles } from './useConfirmProfileStyles';
import { Img } from 'modules/uiKit/Img';

import SVG_mail from '../../assets/mail.svg';
import { DefaultRandomAvatar } from 'modules/common/components/DefaultRandomAvatar';

export const ConfirmProfile: React.FC = () => {
  const classes = useConfirmProfileStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Confirm your profile
      </Typography>

      <Img src={SVG_mail} className={classes.mailImg} />

      <Box className={classes.addPhotoField}>
        <DefaultRandomAvatar
          className={classes.avator}
          verified
          verifiedIconClasses={classes.verifiedIcon}
        />

        <Button className={classes.addPhotoBtn} variant="text">
          Add profile photo
        </Button>
      </Box>

      <Box className={classes.textField}>
        <InputLabel className={classes.inputLabel}>name</InputLabel>
        <OutlinedInput className={classes.Input} fullWidth label="Name" />
      </Box>

      <Button className={classes.continueBtn}>Continue</Button>
    </Box>
  );
};
