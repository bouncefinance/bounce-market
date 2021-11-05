import React from 'react';
import { Box, Button, Typography, Avatar } from '@material-ui/core';
import { useLandingPageStyles } from './useLandingPageStyles';

import testImg from '../../assets/square.png';

const avatar = testImg;
const title = 'Boxing Bullies';
const description1 =
  'Redeem your invite-only NFT here by Friday, November 19. Your NFT artwork will be available and airdropped to your wallet on Saturday, November 20. Your unique password is required to redeem Jake’s NFT.';
const description2 =
  'By clicking Continue, you agree to Fangible’s Privacy Policy and WalletConnect’s Terms of Service.';

export const LandingPage: React.FC = () => {
  const classes = useLandingPageStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.addPhotoField}>
        <Avatar className={classes.avatar} src={avatar} />
      </Box>

      <Typography variant="h2" className={classes.title}>
        {title}
      </Typography>

      <Typography variant="h5" className={classes.description1}>
        {description1}
      </Typography>

      <Button className={classes.continueBtn}>Continue</Button>

      <Typography variant="body1" className={classes.description2}>
        {description2}
      </Typography>
    </Box>
  );
};
