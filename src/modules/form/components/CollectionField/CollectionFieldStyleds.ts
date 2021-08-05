import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core';

export const useCollectionFieldStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > p': {
        marginLeft: 0,
        marginRight: 0,
      },
    },
    collectionBox: {
      maxWidth: 500,
      overflow: 'hidden',
      width: '100%',
      marginTop: 24,
    },
    collectionCard: {
      width: 126,
      height: 135,
      boxSizing: 'border-box',
      border: '1px solid rgba(0,0,0,.1)',
      borderRadius: 16,
      cursor: 'pointer',
      textAlign: 'center',
      paddingTop: 25,
      position: 'relative',

      '&:hover': {
        border: '1px solid rgba(0,0,0,1)',
      },

      '& > h3': {
        display: 'inline-block',
        width: 110,
        height: 20,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    sel: {
      border: '1px solid rgba(0,0,0,1)',
    },
    selIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    img: {
      width: 60,
      height: 60,
      margin: '0 auto',
    },
  }),
);
