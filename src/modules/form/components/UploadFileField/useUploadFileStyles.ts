import { makeStyles, Theme } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

export const useUploadFileStyles = makeStyles<Theme>(theme => ({
  root: {
    height: '100%',
  },
  disabled: {
    cursor: 'not-allowed',
    '& $container': {
      pointerEvents: 'none',
    },
    '& $clearBtn': {
      display: 'none',
    },
  },
  initialBlock: {},
  initialBlockPic: {},
  initialBlockText: {},
  clearBtn: {},
  uploadedWrap: {},
  previewContainer: {},
  previewUploadedImage: {},
  previewUploadedImageFit: {},
  previewContainerVideo: {},
  previewContainerAudio: {},
  previewContainerFile: {},
  filePic: {},
  fileText: {},
  videoDescription: {
    position: 'absolute',
    top: 37,
    left: 20,
    right: 70,
    zIndex: 1,
    opacity: 0,
    color: theme.palette.grey['600'],
    pointerEvents: 'none',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    transition: 'opacity 0.2s',
  },

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

  container: {
    position: 'relative',
    height: '100%',
    '& $initialBlock, & $previewContainerAudio, & $previewContainerFile': {
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
    '& $previewContainerVideo': {
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '& + $input': {
        width: 0,
        height: 0,
        pointerEvents: 'none',
      },
      '&:hover $videoDescription': {
        opacity: 1,
      },
    },
    '& $uploadedWrap': {
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

  previewContainerCropper: {
    display: 'block',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: theme.zIndex.modal + 10,
    opacity: 0,
    transform: 'scale(0.8)',
    transition: 'opacity 0.3s, transform 0.3s',
    pointerEvents: 'none',
  },
  previewContainerCropperShow: {
    opacity: 1,
    transform: 'scale(1)',
    pointerEvents: 'auto',
  },
  cropperContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  cropperCloseBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 150,
    backgroundColor: theme.palette.common.white,
    '&:focus': {
      backgroundColor: theme.palette.common.white,
    },
  },
  cropperBtns: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 150,
    textAlign: 'center',
  },
  cropperTransformBtn: {
    margin: theme.spacing(1, 0.5),
    backgroundColor: theme.palette.common.white,
    '&:focus': {
      backgroundColor: theme.palette.common.white,
    },
    '$previewContainerCropperShow &': {
      animation: `$jumpAnimation 0.3s 0.5s`,
    },
    '&:nth-child(2)': {
      animationDelay: '0.6s',
    },
    '&:nth-child(3)': {
      animationDelay: '0.7s',
    },
    '&:nth-child(4)': {
      animationDelay: '0.8s',
    },
    '&:nth-child(5)': {
      animationDelay: '0.9s',
    },
    '&:nth-child(6)': {
      animationDelay: '1s',
    },
  },
  cropperTransformBtnRestore: {
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.grey['400'],
  },
  cropperTransformBtnSave: {
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.success.light,
  },

  '@keyframes jumpAnimation': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '40%': {
      transform: 'translateY(-30%)',
    },
  },
}));
