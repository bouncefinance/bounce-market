import { makeStyles, Theme } from '@material-ui/core';
import { getPercentage } from '../../common/utils/styleUtils';
import { IImgProps } from './Img';

const getRatio = (ratio: IImgProps['ratio']) => {
  let value: string;
  switch (ratio) {
    case '2x1':
      value = getPercentage(1, 2);
      break;
    case '3x2':
      value = getPercentage(2, 3);
      break;
    case '4x3':
      value = getPercentage(3, 4);
      break;
    case '14x9':
      value = getPercentage(9, 14);
      break;
    case '16x9':
      value = getPercentage(9, 16);
      break;
    default:
      value = getPercentage(1, 1);
      break;
  }
  return value;
};

export const useImgStyles = makeStyles<
  Theme,
  { objectFit: any; ratio: IImgProps['ratio'] }
>(theme => ({
  root: {
    display: 'block',
    position: 'relative',
    backgroundPosition: 'center',

    '&:before': {
      content: `''`,
      display: 'block',
      width: '100%',
      height: 0,
      paddingTop: props => getRatio(props.ratio),
    },
  },

  errorIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E0E0E0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      fontSize: '50px',
    },
  },

  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    transition: 'transform .3s ease',
    objectFit: props => (props.objectFit ? props.objectFit : ''),
  },
}));
