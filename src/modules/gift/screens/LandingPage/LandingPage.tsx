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
  const [
    airdropData,
    setAirdropData,
  ] = useState<IGetAirdropInfoPayload | null>();

  useEffect(() => {
    if (!isConnected) {
      handleConnect();
    }
  }, [handleConnect, isConnected, loading]);

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    try {
      dispatchRequest(getAirdropInfo({ dropsid: +airdropId })).then(res => {
        setAirdropData(res.data);
        setDataLoading(false);
      });
    } catch (error) {
      console.log('getAirdropInfo');
    }
  }, [dispatchRequest, airdropId, isConnected]);

  if (loading || dataLoading) {
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
          src={airdropData?.coverimgurl}
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
        {airdropData?.description}
      </Typography>

      <Button
        className={classNames(
          classes.continueBtn,
          isSMDown ? classes.mobileContinueBtn : classes.desktopContinueBtn,
        )}
        loading={loading}
        onClick={() => {
          isConnected
            ? history.push(`/airdrop/${airdropId}/enterpwd`)
            : handleConnect();
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
