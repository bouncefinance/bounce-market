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

  rootError: {
    backgroundColor: '#E0E0E0',
  },

  errorIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxHeight: '50%',
    maxWidth: '50%',
    fontSize: '50px',
    transform: 'translate3d(-50%, -50%, 0px)',
  },

  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    objectFit: props => (props.objectFit ? props.objectFit : ''),
  },
}));
