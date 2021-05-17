import { makeStyles, Theme } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

export const useUploadFileStyles = makeStyles<Theme>(theme => ({
  root: {
    height: '100%',
  },
  container: {
    position: 'relative',
    height: '100%',
    '& $initialBlock, & $previewContainerVideo, & $previewContainerAudio, & $previewContainerFile': {
      height: '100%',
      background: theme.palette.grey['300'],
      borderRadius: 22,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2, 1),
    },
    '& $previewContainerVideo, & $previewContainerAudio, & $previewContainerFile': {
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
      height: '100%',
    },
    '& $previewContainer': {
      height: '100%',
    },
    '& $previewUploadedImage': {
      height: '100%',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      '&$previewUploadedImageFit': {
        backgroundSize: 'contain',
      },
    },
    '& $clearBtn': {
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 150,
      backgroundColor: theme.palette.common.white,
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
  previewContainerAudio: {},
  previewContainerFile: {},
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
}));
