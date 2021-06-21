import { useQuery } from '@redux-requests/react';
import { useCallback } from 'react';
import { useAppDispatch } from 'store/useAppDispatch';
import { ISetAccountData, setAccount } from '../store/actions/setAccount';
import { connect } from '../store/actions/connect';
import { BlockchainNetworkId } from '../../common/conts';
import { changeNetworkToSupported } from '../store/actions/changeNetworkToSupported';
import { updateAccount } from '../store/actions/updateAccount';
import { makeStyles } from '@material-ui/styles';
import arrow from 'modules/account/assets/arrow.svg';

export const useAccount = () => {
  const dispatch = useAppDispatch();

  const { loading, data, error } = useQuery<ISetAccountData | null>({
    type: setAccount.toString(),
  });

  const address = data?.address;
  const isConnected = !!address;

  const chainId = parseInt((data?.chainId ?? 0).toString());

  const isChainSupported = chainId === BlockchainNetworkId.smartchain;

  const walletSupportNetworkChange = !!data?.web3?.givenProvider;

  const handleConnect = useCallback(() => {
    dispatch(connect());
  }, [dispatch]);

  const handleChangeNetworkToSupported = useCallback(() => {
    dispatch(changeNetworkToSupported());
  }, [dispatch]);

  // Fix styles for wallet connection QR-code modal
  const useStyles = makeStyles({
    '@global': {
      '#walletconnect-qrcode-modal': {
        overflow: 'auto',
      },
      '#walletconnect-qrcode-modal .walletconnect-modal__base': {
        top: 'auto',
        transform: 'none',
        margin: '50px auto',
        maxWidth: '400px',
      },
      '.web3modal-modal-card': {
        marginTop: 44,
        maxWidth: '700px !important',
        height: '520px',
        display: 'block !important',
        paddingTop: '120px !important',
      },
      '.web3modal-provider-wrapper': {
        padding: '12px 8px !important',
      },
      '.web3modal-provider-container': {
        maxWidth: '380px !important',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '50px !important',
        flexDirection: 'row !important',
        padding: '16px 28px !important',
        backgroundImage: `url('${arrow}')`,
        backgroundPosition: 'right 30px center',
        backgroundRepeat: 'no-repeat',
        '& img': {
          width: '36px !important',
          height: '36px !important',
        }
      },
      '.web3modal-provider-description': {
        display: 'none',
      },
      '.web3modal-provider-name': {
        fontSize: '18px !important',
        textAlign: 'left',
        paddingLeft: 16,
      }
    },
  });
  useStyles();

  const handleUpdate = useCallback(
    updatedData => {
      dispatch(updateAccount(updatedData));
    },
    [dispatch],
  );

  return {
    loading,
    isConnected,
    isChainSupported,
    walletSupportNetworkChange,
    address,
    error,
    handleConnect,
    handleChangeNetworkToSupported,
    handleUpdate,
    chainId,
  };
};
