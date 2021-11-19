import { createStyles, makeStyles } from '@material-ui/core';

interface Props {
  isSMDown: boolean;
}

export const useGiftHeaderStyles = makeStyles(theme =>
  createStyles({
    skeleton: {
      background: 'rgba(255,255,255,0.2)',
    },

    root: (props: Props) => ({
      width: props.isSMDown ? 315 : 416,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      marginTop: props.isSMDown ? 24 : 60,
    }),

    logo: {
      color: '#fff',
    },

    brandInfo: (props: Props) => ({
      display: 'flex',
      alignItems: 'center',
      columnGap: 15,

      marginBottom: props.isSMDown ? 24 : 60,
    }),

    brandAvatar: {
      width: 40,
      height: 40,
    },

    brandName: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#fff',
      maxWidth: 200,
      wordBreak: 'break-all',
    },

    title: (props: Props) => ({
      fontSize: props.isSMDown ? 25 : 32,
      lineHeight: props.isSMDown ? '27px' : '39px',
      color: '#fff',
      textAlign: 'center',
    }),

    description: (props: Props) => ({
      fontSize: 14,
      fontWeight: 'normal',
      lineHeight: '20px',
      textAlign: 'center',
      color: '#fff',

      marginTop: props.isSMDown ? 20 : 40,
    }),
  }),
);
