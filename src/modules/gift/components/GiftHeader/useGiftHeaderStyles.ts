import { createStyles, makeStyles } from '@material-ui/core';

interface Props {
  isXSDown: boolean;
}

export const useGiftHeaderStyles = makeStyles(theme =>
  createStyles({
    root: (props: Props) => ({
      // marginTop: props.isXSDown ? 40 : 24,
      width: 315,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }),

    logo: {
      color: '#fff',
    },

    brandInfo: (props: Props) => ({
      display: 'flex',
      alignItems: 'center',

      // marginTop: props.isXSDown ? 24 : 60,
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

    title: {
      fontSize: 25,
      lineHeight: '27px',
      color: '#fff',
      textAlign: 'center',
    },

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
