import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAccount } from 'modules/account/hooks/useAccount';
import { Box, Button, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useClaimNftStyles } from './useClaimNftStyles';
import { Img } from 'modules/uiKit/Img';
import { QueryLoadingAbsolute } from '../../../common/components/QueryLoading/QueryLoading';

import { useIsSMDown } from 'modules/themes/useTheme';
import { GiftHeader } from 'modules/gift/components/GiftHeader';
import { GiftRoutesConfig } from 'modules/gift/Routes';
import { useDispatchRequest } from '@redux-requests/react';
import { getAirdropByCode } from 'modules/gift/actions/getAirdropByCode';
import { getAirdropInfo } from 'modules/gift/actions/getAirdropInfo';
import classNames from 'classnames';
import { mint } from 'modules/gift/actions/mint';

export const ClaimNft: React.FC = () => {
  const styles = useClaimNftStyles();
  const { address } = useAccount();
  const isSMDown = useIsSMDown();
  const dispatchRequest = useDispatchRequest();
  const { airdropId } = GiftRoutesConfig.LandingPage.useParams();
  let location = useLocation<{
    verifyCode: string;
  }>();
  const history = useHistory();

  const [isClaiming, setIsClaiming] = useState<boolean>(false);

  const [airdropTitle, setAirdropTitle] = useState<string>();
  const [brandName, setBrandName] = useState<string>();
  const [supply, setSupply] = useState<number>();
  const [tokenId, setTokenId] = useState<number>();
  const [fileUrl, setFileUrl] = useState<string>();
  const [contractAddress, setContractAddress] = useState<string>();
  const [status, setStatus] = useState<'claim' | 'back'>('claim');

  const handleClaim = async () => {
    if (!tokenId || !address || !contractAddress) {
      return;
    }
    setIsClaiming(true);
    try {
      await dispatchRequest(
        mint({
          accountaddress: address,
          contractaddress: contractAddress,
          tokenid: tokenId,
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
    dispatchRequest(getAirdropInfo({ dropsid: +airdropId })).then(res => {
      setAirdropTitle(res.data?.title);
      setBrandName(res.data?.airdropinfo.brandname);
      setSupply(res.data?.airdropinfo.totalsupply);
    });

    dispatchRequest(
      getAirdropByCode({ verifycode: location.state.verifyCode }),
    ).then(res => {
      setTokenId(res.data?.tokenid);
      setFileUrl(res.data?.fileurl);
      setContractAddress(res.data?.contractaddress);
    });
  }, []);

  if (isClaiming) {
    return (
      <Box className={styles.loadingBox}>
        <QueryLoadingAbsolute />
      </Box>
    );
  }

  return (
    <Box className={styles.root}>
      <GiftHeader
        airdropId={+airdropId}
        title={'Claim your NFT artwork'}
        description={
          'You’ll find this password on the interior of the attached envelope that came in your package.'
        }
      />

      {fileUrl ? (
        <Img
          src={fileUrl}
          className={isSMDown ? styles.smallNftImg : styles.bigNftImg}
        />
      ) : (
        <Skeleton
          variant="rect"
          animation="wave"
          className={classNames(
            styles.skeleton,
            isSMDown ? styles.smallNftImg : styles.bigNftImg,
          )}
        />
      )}

      <Typography variant="h5" className={styles.nftDescription}>
        {`${airdropTitle || ''} - ${brandName || ''} Exclusive`}
        <br />
        {`1 of ${supply || ''} - Edition #${tokenId || ''}`}
      </Typography>

      {status === 'back' && (
        <Button
          className={styles.continueBtn}
          onClick={() => {
            history.push('/');
          }}
        >
          Back to Fangible
        </Button>
      )}

      {status === 'claim' && (
        <Button className={styles.continueBtn} onClick={handleClaim}>
          Claim NFT
        </Button>
      )}
    </Box>
  );
};
