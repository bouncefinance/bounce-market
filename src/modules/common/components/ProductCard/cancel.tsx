import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { useState } from 'react';
import { useProductCardStyles } from './useProductCardStyles';
import { Link as RouterLink } from 'react-router-dom';
import { useWeb3React } from 'modules/account/hooks/useWeb3React';
import { AuctionType } from 'modules/api/common/auctionType';
import {
  BounceEnglishAuctionNFTTime,
  BounceFixedSwapNFTTime,
} from 'modules/web3/contracts';
import { fetchAllNftByUser } from 'modules/profile/actions/fetchAllNftByUser';
import { useDispatchRequest } from '@redux-requests/react';
import {
  getEnglishAuctionContract,
  getFixedSwapContract,
} from 'modules/createNFT/actions/publishNft';
import { NotificationActions } from 'modules/notification/store/NotificationActions';
import { useDispatch } from 'react-redux';
import { MetaMaskError } from 'modules/common/types/metamask';

export const CancelPutTime: React.FC<{
  id?: number;
  auctionType?: AuctionType;
}> = ({ id, auctionType }) => {
  const dispatchRequest = useDispatchRequest();
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
  const refresh = () => {
    dispatchRequest(fetchAllNftByUser(account));
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
        component={RouterLink}
        variant="outlined"
        rounded
        onClick={onClick}
        disable={loading}
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
          <Button
            variant="outlined"
            disable={loading}
            loading={loading}
            onClick={handleClose}
          >
            {t('common.no')}
          </Button>
          <Button onClick={onSuccess} loading={loading} disable={loading}>
            {t('common.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
