import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Avatar } from '@material-ui/core';
import { useClaimNftStyles } from './useClaimNftStyles';
import { Img } from 'modules/uiKit/Img';

import testImg from '../../assets/square.png';
import { useIsSMDown } from 'modules/themes/useTheme';
// import testImg from '../../assets/long.jpg';
// import testImg from '../../assets/tall.png';

const brandAvatar = testImg;
const brandName = 'Boxing Bullies';
const name = 'Jake Paul - Boxing Buddies Exclusive';
const order = '1 of 100 - Edition #3';

export const ClaimNft: React.FC = () => {
  const styles = useClaimNftStyles();

  const isSMDown = useIsSMDown();

  return (
    <Box className={styles.root}>
      <Box className={styles.brandInfo}>
        <Avatar className={styles.brandAvatar} src={brandAvatar} />
        <Typography variant="h5" className={styles.brandName}>
          {brandName}
        </Typography>
      </Box>

      <Typography variant="h2" className={styles.title}>
        Claim your NFT artwork
      </Typography>

      <Typography variant="h5" className={styles.description}>
        You’ll find this password on the interior of the attached envelope that
        came in your package.
      </Typography>

      <Img
        src={testImg}
        className={isSMDown ? styles.smallNftImg : styles.bigNftImg}
      />

      <Typography variant="h5" className={styles.nftDescription}>
        {name}
        <br />
        {order}
      </Typography>

      <Button className={styles.continueBtn}>Claim NFT</Button>

      <Link to="/">
        <Button className={styles.continueBtn}>Back to Fangible</Button>
      </Link>
    </Box>
  );
};
