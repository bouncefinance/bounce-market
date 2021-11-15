import { createStyles, makeStyles } from '@material-ui/core';

interface Props {
  isXSDown: boolean;
}

export const useGiftHeaderStyles = makeStyles(theme =>
  createStyles({
    root: (props: Props) => ({
      width: props.isXSDown ? 315 : 416,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      marginTop: props.isXSDown ? 24 : 60,
    }),

    logo: {
      color: '#fff',
    },

    brandInfo: (props: Props) => ({
      display: 'flex',
      alignItems: 'center',

      marginBottom: props.isXSDown ? 24 : 60,
    }),

    brandAvatar: {
      width: 40,
      height: 40,
    },

    brandName: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#fff',
      marginLeft: 15,
      maxWidth: 200,
      wordBreak: 'break-all',
    },

    title: (props: Props) => ({
      fontSize: props.isXSDown ? 25 : 32,
      lineHeight: props.isXSDown ? '27px' : '39px',
      color: '#fff',
      textAlign: 'center',
    }),

    description: (props: Props) => ({
      fontSize: 14,
      fontWeight: 'normal',
      lineHeight: '20px',
      textAlign: 'center',
      color: '#fff',

      marginTop: props.isXSDown ? 20 : 40,
    }),
  }),
);
