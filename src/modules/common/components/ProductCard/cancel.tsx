import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { useState } from 'react';
import { useProductCardStyles } from './useProductCardStyles';
import { useWeb3React } from 'modules/account/hooks/useWeb3React';
import { AuctionType } from 'modules/api/common/auctionType';
import {
  BounceEnglishAuctionNFTTime,
  BounceFixedSwapNFTTime,
} from 'modules/web3/contracts';
import { useDispatchRequest } from '@redux-requests/react';
import {
  getEnglishAuctionContract,
  getFixedSwapContract,
} from 'modules/createNFT/actions/publishNft';
import { NotificationActions } from 'modules/notification/store/NotificationActions';
import { useDispatch } from 'react-redux';
import { MetaMaskError } from 'modules/common/types/metamask';
import { fixedSwapCancel } from 'modules/overview/actions/fixedSwapCancel';

export const CancelPutTime: React.FC<{
  id?: number;
  auctionType?: AuctionType;
  reload?: () => void;
}> = ({ id, auctionType, reload: refresh }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const classes = useProductCardStyles();
  const { web3, account, chainId } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const onClick = () => {
    setOpen(true);
  };
  const onSuccess = () => {
    let contract;
    if (AuctionType.FixedSwap_Timing === auctionType) {
      contract = new web3.eth.Contract(
        BounceFixedSwapNFTTime,
        getFixedSwapContract(chainId, true),
      ).methods.cancel(id);
    }

    if (AuctionType.EnglishAuction_Timing === auctionType) {
      contract = new web3.eth.Contract(
        BounceEnglishAuctionNFTTime,
        getEnglishAuctionContract(chainId, true),
      ).methods.cancel(id);
    }
    if (!contract) {
      console.error('auctionType type, error:', auctionType);
      return;
    }
    // TODO await To optimize the
    contract
      .send({ from: account, gas: 200000 })
      .on('transactionHash', (hash: string) => {
        setLoading(true);
      })
      .on('receipt', async (receipt: any) => {
        try {
          handleClose();
          setLoading(false);
          refresh?.();
        } catch (error) {}
      })
      .on('error', (error: MetaMaskError) => {
        setLoading(false);
        // User denied transaction signature.
        if (error?.code === 4001) {
          return;
        }
        dispatch(
          NotificationActions.showNotification({
            // TODO link scan
            message: error?.message ?? 'error',
            severity: 'error',
          }),
        );
      });
    setLoading(true);
  };
  return (
    <>
      <Button
        className={classes.saleBtn}
        variant="outlined"
        rounded
        onClick={onClick}
        disabled={loading}
        loading={loading}
      >
        {t('product-card.put-on-cancel')}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        disableBackdropClick={loading}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {t('cancel-timer.title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{t('cancel-timer.inner')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" disabled={loading} onClick={handleClose}>
            {t('common.no')}
          </Button>
          <Button onClick={onSuccess} loading={loading} disabled={loading}>
            {t('common.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const CancelPutOnSale: React.FC<{
  id?: number;
  tokenId: string;
  auctionType?: AuctionType;
  reload?: () => void;
}> = ({ id, tokenId, auctionType, reload: refresh }) => {
  const dispatchRequest = useDispatchRequest();
  const classes = useProductCardStyles();
  // const { account } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);
    dispatchRequest(
      fixedSwapCancel({ poolId: id, poolType: auctionType, tokenId }),
    ).then(({ error }) => {
      setLoading(false);
      if (!error) {
        refresh?.();
      }
    });
  };
  return (
    <>
      <Button
        className={classes.saleBtn}
        variant="outlined"
        rounded
        onClick={onClick}
        disabled={loading}
        loading={loading}
      >
        {t('product-card.put-on-cancel')}
      </Button>
    </>
  );
};
