import { makeStyles, Theme } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

export const useUploadFileStyles = makeStyles<Theme>(theme => ({
  root: {},
  container: {
    position: 'relative',
    maxWidth: 380,
    marginRight: 'auto',
    marginLeft: 'auto',
    '&:before': {
      display: 'block',
      content: `''`,
      paddingBottom: '100%',
    },
  },
  initialBlock: {},
  initialBlockPic: {},
  initialBlockText: {},
  clearBtn: {},
  fileUploaded: {},
  previewContainer: {},
  previewUploadedImage: {},
  previewUploadedImageFit: {},
  previewContainerVideo: {},
  filePic: {},
  fileText: {},

  input: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    zIndex: 100,
    '&:hover': {
      cursor: 'pointer',
    },
  },

  bigBlock: {
    '& $initialBlock, & $previewContainerVideo': {
      background: theme.palette.grey['300'],
      borderRadius: 22,
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 10,
      paddingTop: theme.spacing(10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(10, 1, 2, 1),
    },
    '& $previewContainerVideo': {
      borderRadius: 0,
    },
    '& $initialBlockPic, & $filePic': {
      marginBottom: theme.spacing(4),
    },
    '& $initialBlockText, & $fileText': {
      color: '#9B9B9B',
      '& strong': {
        color: '#000',
      },
    },
    '& $fileUploaded': {
      border: `1px solid ${fade(theme.palette.common.black, 0.1)}`,
      borderRadius: 12,
      overflow: 'hidden',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 15,
    },
    '& $previewContainer': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 20,
    },
    '& $previewUploadedImage': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 30,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    '& $previewUploadedImageFit': {
      backgroundSize: 'contain !important',
    },
    '& $clearBtn': {
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 150,
      backgroundColor: theme.palette.common.white,
    },
  },

  uploadedImage: {
    width: '100%',
    maxWidth: 380,
    height: 'auto',
  },
}));
