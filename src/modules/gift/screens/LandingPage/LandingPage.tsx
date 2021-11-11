import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Avatar } from '@material-ui/core';
import { useLandingPageStyles } from './useLandingPageStyles';

// import testImg from '../../assets/square.png';
import { GiftHeader } from 'modules/gift/components/GiftHeader';
import { useIsXSDown } from 'modules/themes/useTheme';
import classNames from 'classnames';
import {
  getAirdropInfo,
  IGetAirdropInfoPayload,
} from 'modules/gift/actions/getAirdropInfo';
import { GiftRoutesConfig } from 'modules/gift/Routes';
import { useDispatchRequest } from '@redux-requests/react';
import { Link } from 'react-router-dom';
import { useAccount } from 'modules/account/hooks/useAccount';

// const avatar = testImg;
// const title = 'Boxing Bullies';
// const description1 =
//   'Redeem your invite-only NFT here by Friday, November 19. Your NFT artwork will be available and airdropped to your wallet on Saturday, November 20. Your unique password is required to redeem Jake’s NFT.';
const description2 =
  'By clicking Continue, you agree to Fangible’s Privacy Policy and WalletConnect’s Terms of Service.';

export const LandingPage: React.FC = () => {
  const classes = useLandingPageStyles();
  const isXSDown = useIsXSDown();
  const dispatchRequest = useDispatchRequest();
  const { airdropId } = GiftRoutesConfig.LandingPage.useParams();

  const { isConnected, handleConnect, loading, chainId } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      handleConnect();
    }
  }, [isConnected]);

  const [
    airdropData,
    setAirdropData,
  ] = useState<IGetAirdropInfoPayload | null>();

  useEffect(() => {
    console.log('airdropId: ', airdropId);
  }, [airdropId]);

  useEffect(() => {
    dispatchRequest(getAirdropInfo({ dropsid: +airdropId })).then(res => {
      console.log('res: ', res);
      setAirdropData(res.data);
    });
  }, [dispatchRequest, airdropId]);

  return (
    <Box className={classes.root}>
      <Box className={classes.addPhotoField}>
        <Avatar
          className={classNames(
            classes.avatar,
            !isXSDown && classes.desktopAvatar,
          )}
          src={airdropData?.coverimgurl}
        />
      </Box>

      <GiftHeader
        airdropId={+airdropId}
        title={airdropData?.title}
        description={airdropData?.description}
      />

      <Link to={`/airdrop/${airdropId}/enterpwd`}>
        <Button className={classes.continueBtn}>Continue</Button>
      </Link>

      <Typography variant="body1" className={classes.description2}>
        {description2}
      </Typography>
    </Box>
  );
};
