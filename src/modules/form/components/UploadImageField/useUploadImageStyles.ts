import { makeStyles, Theme } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

export const useUploadImageStyles = makeStyles<Theme>(theme => ({
  upload: {
    background: theme.palette.grey['300'],
    borderRadius: 22,
    position: 'relative',
    paddingTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(10, 1, 2, 1),
    minHeight: 380,
  },
  uploaded: {
    minHeight: 380,
    border: `1px dashed ${fade(theme.palette.common.black, 0.1)}`,
    position: 'relative',
  },
  input: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  image: {
    marginBottom: theme.spacing(4),
  },
  note: {
    color: '#9B9B9B',
    '& b': {
      color: '#000',
    },
  },
  uploadedImage: {
    width: '100%',
    maxWidth: 380,
  },
}));
