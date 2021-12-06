import React, { useEffect, useState } from 'react';
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
import { getOneVerifyCode } from 'modules/gift/actions/getOneVerifyCode';

const title = {
  available: 'Claim your NFT artwork',
  success: 'You’re all set',
  claimed: 'The NFT was claimed',
};

export const ClaimNft: React.FC = () => {
  const styles = useClaimNftStyles();
  const dispatchRequest = useDispatchRequest();
  const { airdropId } = GiftRoutesConfig.LandingPage.useParams();
  let location = useLocation<{
    verifyCode?: string;
  }>();
  const history = useHistory();
  const isSMDown = useIsSMDown();
  const { isConnected, address } = useAccount();
  const dispatch = useDispatchRequest();

  const [loading, setLoading] = useState<boolean>(true);
  const [
    airdropData,
    setAirdropData,
  ] = useState<IGetAirdropInfoPayload | null>();
  const [nftData, setNftData] = useState<IGetAirdropByCodePayload | null>();
  const [claimStatus, setClaimStatus] = useState<
    'available' | 'success' | 'claimed'
  >('available');
  const [verifyCode, setVerifyCode] = useState(location.state.verifyCode);
  const [isBeforeOpenTime, setIsBeforeOpenTime] = useState<boolean>();

  useEffect(() => {
    dispatchRequest(getAirdropInfo({ dropsid: +airdropId })).then(res => {
      setAirdropData(res.data);

      // 保存当前时间是否超过开抢时间
      if (res.data) {
        setIsBeforeOpenTime(
          res.data.airdropinfo.opendate >
            Math.floor(new Date().valueOf() / 1000),
        );
      }
    });
  }, [airdropId, dispatchRequest]);

  // 未连接钱包或在开抢前没带verifyCode进入,则回到首页
  useEffect(() => {
    if (!isConnected || (isBeforeOpenTime && !location.state.verifyCode)) {
      history.push(`/airdrop/${airdropId}/landing`);
    }
  }, [
    airdropId,
    history,
    isConnected,
    isBeforeOpenTime,
    location.state.verifyCode,
    verifyCode,
  ]);

  // 如果当前时间已过开抢时间，则通过接口获取verifycode
  useEffect(() => {
    if (!airdropData) {
      return;
    }

    if (!isBeforeOpenTime) {
      dispatchRequest(
        getOneVerifyCode({
          contractaddress: airdropData.airdropinfo.collection,
        }),
      ).then(res => {
        if (res.data) {
          setVerifyCode(res.data.verifycode);
        }
      });
    }
  }, [airdropData, dispatchRequest, isBeforeOpenTime]);

  useEffect(() => {
    if (!airdropData || !verifyCode) {
      return;
    }

    setLoading(true);

    dispatchRequest(
      getAirdropByCode({
        verifycode: verifyCode,
      }),
    ).then(res => {
      setNftData(res.data);
      if (res.data?.state === 2 || res.data?.state === 3) {
        setClaimStatus('claimed');
      }

      setLoading(false);
    });
  }, [airdropData, dispatchRequest, verifyCode]);

  if (loading) {
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

  const handleClaim = async () => {
    if (
      !nftData?.tokenid ||
      !address ||
      !nftData.contractaddress ||
      !airdropData ||
      !verifyCode
    ) {
      return;
    }

    setLoading(true);

    try {
      dispatchRequest(
        mint({
          accountaddress: address,
          contractaddress: nftData.contractaddress,
          tokenid: nftData?.tokenid,
          verifycode: verifyCode,
        }),
      ).then(() => {
        setLoading(false);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setClaimStatus('success');
    }
  };

  return (
    <Box className={styles.root}>
      <GiftHeader airdropId={+airdropId} title={title[claimStatus]} />

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

      {(claimStatus === 'success' ||
        (nftData && (nftData.state === 2 || nftData.state === 3))) && (
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

      {claimStatus === 'available' && (
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
