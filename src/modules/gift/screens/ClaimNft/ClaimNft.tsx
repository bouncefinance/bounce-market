import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAccount } from 'modules/account/hooks/useAccount';
import { Box, Button, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useClaimNftStyles } from './useClaimNftStyles';
import { Img } from 'modules/uiKit/Img';
import { useIsSMDown } from 'modules/themes/useTheme';
import { GiftHeader } from 'modules/gift/components/GiftHeader';
import { GiftRoutesConfig } from 'modules/gift/Routes';
import { useDispatchRequest } from '@redux-requests/react';
import {
  getAirdropByCode,
  IGetAirdropByCodePayload,
} from 'modules/gift/actions/getAirdropByCode';
import {
  getAirdropInfo,
  IGetAirdropInfoPayload,
} from 'modules/gift/actions/getAirdropInfo';
import classNames from 'classnames';
import { mint } from 'modules/gift/actions/mint';
import { Spinner } from 'modules/common/components/Spinner';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';

export const ClaimNft: React.FC = () => {
  const styles = useClaimNftStyles();
  const dispatchRequest = useDispatchRequest();
  const { airdropId } = GiftRoutesConfig.LandingPage.useParams();
  let location = useLocation<{
    verifyCode: string;
  }>();
  const history = useHistory();
  const isSMDown = useIsSMDown();
  const { isConnected, address } = useAccount();
  const dispatch = useDispatchRequest();

  const [isClaiming, setIsClaiming] = useState<boolean>(false);

  const [
    airdropData,
    setAirdropData,
  ] = useState<IGetAirdropInfoPayload | null>();
  const [nftData, setNftData] = useState<IGetAirdropByCodePayload | null>();

  const [status, setStatus] = useState<'claim' | 'back'>('claim');

  const handleClaim = async () => {
    if (!nftData?.tokenid || !address || !nftData.contractaddress) {
      return;
    }
    setIsClaiming(true);
    try {
      await dispatchRequest(
        mint({
          accountaddress: address,
          contractaddress: nftData.contractaddress,
          tokenid: nftData?.tokenid,
          verifycode: location.state.verifyCode,
        }),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsClaiming(false);
      setStatus('back');
    }
  };

  useEffect(() => {
    if (!isConnected || !location.state.verifyCode) {
      history.push(`/airdrop/${airdropId}/landing`);
    }
  }, [airdropId, history, isConnected, location.state.verifyCode]);

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    dispatchRequest(getAirdropInfo({ dropsid: +airdropId })).then(res => {
      setAirdropData(res.data);
    });
  }, [airdropId, dispatchRequest, isConnected]);

  useEffect(() => {
    dispatchRequest(
      getAirdropByCode({ verifycode: location.state.verifyCode }),
    ).then(res => {
      setNftData(res.data);
    });
  }, [airdropId, dispatchRequest, location.state.verifyCode]);

  if (isClaiming) {
    return (
      <Box className={styles.root}>
        <GiftHeader airdropId={+airdropId} />
        <Box className={styles.loadingBox}>
          <span className={styles.waitStr}>Please wait</span>
          <Spinner centered />
        </Box>
      </Box>
    );
  }

  return (
    <Box className={styles.root}>
      <GiftHeader
        airdropId={+airdropId}
        title={status === 'claim' ? 'Claim your NFT artwork' : 'You’re all set'}
        description={
          'You’ll find this password on the interior of the attached envelope that came in your package.'
        }
      />

      {nftData?.fileurl ? (
        <Img
          src={nftData?.fileurl}
          className={classNames(
            styles.nftImg,
            isSMDown ? styles.smallNftImg : styles.bigNftImg,
          )}
        />
      ) : (
        <Skeleton
          variant="rect"
          animation="wave"
          className={classNames(
            styles.skeleton,
            styles.nftImg,
            isSMDown ? styles.smallNftImg : styles.bigNftImg,
          )}
        />
      )}

      <Typography variant="h5" className={styles.nftDescription}>
        {`${airdropData?.title || ''} - ${
          airdropData?.airdropinfo.brandname || ''
        } Exclusive`}
        <br />
        {`1 of ${airdropData?.airdropinfo.totalsupply || ''} - Edition #${
          nftData?.tokenid || ''
        }`}
      </Typography>

      {status === 'back' && (
        <Button
          className={classNames(
            styles.continueBtn,
            isSMDown ? styles.mobileContineBtn : styles.desktopContineBtn,
          )}
          onClick={() => {
            history.push('/');
          }}
        >
          Back to Fangible
        </Button>
      )}

      {status === 'claim' && (
        <Button
          className={classNames(
            styles.continueBtn,
            isSMDown ? styles.mobileContineBtn : styles.desktopContineBtn,
          )}
          onClick={() => {
            handleClaim();

            if (address) {
              dispatch(fetchProfileInfo({ address }));
            }
          }}
        >
          Claim NFT
        </Button>
      )}
    </Box>
  );
};
