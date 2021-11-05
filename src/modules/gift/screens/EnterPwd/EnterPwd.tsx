import React from 'react';
import {
  Box,
  Button,
  Grid,
  Tooltip,
  Typography,
  InputBase,
  OutlinedInput,
} from '@material-ui/core';
import { useEnterPwdStyles } from './useEnterPwdStyles';
import { Img } from 'modules/uiKit/Img';

import SVG_mail from '../../assets/mail.svg';

export const EnterPwd: React.FC = () => {
  const classes = useEnterPwdStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Please enter your unique password
      </Typography>

      <Typography variant="h5" className={classes.description}>
        You’ll find this password on the interior of the attached envelope that
        came in your package.
      </Typography>

      <Img src={SVG_mail} className={classes.mailImg} />

      <OutlinedInput className={classes.pwdInput} fullWidth />

      <Button className={classes.enterBtn}>Enter Password</Button>
    </Box>
  );
};
