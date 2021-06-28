import { darken, makeStyles, Theme } from '@material-ui/core';
import arrow from 'modules/account/assets/arrow.svg';

export const useWeb3ModalStylesStyles = makeStyles<Theme>(theme => ({
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
      maxWidth: '620px !important',
      display: 'block !important',
      padding: `${theme.spacing(10, 0)} !important`,
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
      },

      '.web3modal-provider-wrapper:hover &&': {
        backgroundColor: darken(theme.palette.common.white, 0.05),
      },
    },

    '.web3modal-provider-description': {
      display: 'none',
    },

    '.web3modal-provider-name': {
      fontSize: '18px !important',
      textAlign: 'left',
      paddingLeft: 16,
    },
  },
}));
