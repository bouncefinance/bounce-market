import { makeStyles, createStyles } from '@material-ui/core';

interface Props {
  isXSDown: boolean;
}

export const useGiftSkeletonStyles = makeStyles(theme =>
  createStyles({
    root: (props: Props) => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      marginLeft: 14,
      marginRight: 16,
    }),

    avatar: {
      width: 170,
      height: 170,
    },

    desktopAvatar: {
      marginTop: 120,
      marginBottom: 60,
    },

    mobileAvatar: {
      marginTop: 40,
      marginBottom: 20,
    },

    continueBtn: {
      width: 170,
      height: 50,

      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      boxSizing: 'border-box',
      borderRadius: 39,

      '&.MuiButton-contained': {
        color: '#000',
      },
    },

    desktopContinueBtn: {
      marginTop: 60,
      marginBottom: 20,
    },

    mobileContinueBtn: {
      marginTop: 40,
      marginBottom: 20,
    },

    description: {
      fontWeight: 'normal',
      fontSize: 10,
      lineHeight: '16px',
      textAlign: 'center',
      color: '#eee',

      width: 358,

      // '&:first-child': {
      //   marginTop: 20,
      // },
    },

    skeleton: {
      background: 'rgba(255,255,255,0.2)',
    },
  }),
);
