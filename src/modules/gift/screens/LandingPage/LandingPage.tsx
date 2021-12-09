import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useLandingPageStyles } from './useLandingPageStyles';

import { useIsSMDown } from 'modules/themes/useTheme';
import classNames from 'classnames';
import {
  getAirdropInfo,
  IGetAirdropInfoPayload,
} from 'modules/gift/actions/getAirdropInfo';
import { GiftRoutesConfig } from 'modules/gift/Routes';
import { useDispatchRequest } from '@redux-requests/react';
import { useHistory } from 'react-router-dom';
import { useAccount } from 'modules/account/hooks/useAccount';
import { Button } from 'modules/uiKit/Button';
import { DefaultRandomAvatar } from 'modules/common/components/DefaultRandomAvatar';
import { GiftSkeleton } from 'modules/gift/components/GiftSkeleton';

export const LandingPage: React.FC = () => {
  const classes = useLandingPageStyles();
  const isSMDown = useIsSMDown();
  const history = useHistory();
  const dispatchRequest = useDispatchRequest();
  const { airdropId } = GiftRoutesConfig.LandingPage.useParams();
  const { isConnected, handleConnect, loading } = useAccount();

  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [walletLoading, setWalletLoading] = useState<boolean>(false);
  const [
    airdropData,
    setAirdropData,
  ] = useState<IGetAirdropInfoPayload | null>();

  useEffect(() => {
    try {
      dispatchRequest(getAirdropInfo({ dropsid: +airdropId })).then(res => {
        setAirdropData(res.data);
        if (res.data) {
          setDataLoading(false);
        }
      });
    } catch (error) {
      console.log('getAirdropInfo');
    }
  }, [dispatchRequest, airdropId]);

  if (dataLoading) {
    return <GiftSkeleton />;
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.addPhotoField}>
        <DefaultRandomAvatar
          className={classNames(
            classes.avatar,
            isSMDown ? classes.mobileAvatar : classes.desktopAvatar,
          )}
          src={airdropData?.airdropinfo.logourl}
          imgWidth={320}
        />
      </Box>

      <Typography variant="h2" className={classes.title}>
        {airdropData?.title}
      </Typography>

      <Typography
        variant="h5"
        className={classNames(
          classes.description1,
          isSMDown ? classes.mobileDescription1 : classes.desktopDescription1,
        )}
      >
        Boxing Bullies, a foundation created by Jake to instill leadership and
        confidence in the youth through boxing, is releasing a collection of
        NFTs to commemorate the historic second #PaulWoodley fight.
      </Typography>

      <Button
        className={classNames(
          classes.continueBtn,
          isSMDown ? classes.mobileContinueBtn : classes.desktopContinueBtn,
        )}
        loading={walletLoading && loading}
        onClick={() => {
          if (!window.ethereum) {
            history.push('/airdrop/instruction');
          } else if (isConnected) {
            if (
              airdropData &&
              airdropData.airdropinfo.opendate >
                Math.floor(new Date().valueOf() / 1000)
            ) {
              history.push(`/airdrop/${airdropId}/enterpwd`);
            } else {
              history.push(`/airdrop/${airdropId}/claim`, {
                verifycode: undefined,
              });
            }
          } else {
            setWalletLoading(true);
            handleConnect();
          }
        }}
      >
        Continue
      </Button>

      <Typography variant="body1" className={classes.description2}>
        By clicking Continue, you agree to Fangible’s Privacy Policy and
        WalletConnect’s Terms of Service.
      </Typography>
    </Box>
  );
};
