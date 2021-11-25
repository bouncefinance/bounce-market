import { makeStyles, Theme } from '@material-ui/core';
import bg from '../../assets/bg.svg';

export const useInstructionStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 56,
    // marginLeft: 14,
    // marginRight: 16,

    backgroundImage: `url('${bg}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 20px',
  },

  mobileLogo: {
    width: 77,
  },
  desktopLogo: {
    width: 107,
  },

  stepBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    width: 312,

    background: '#0E0E0E',
    border: '1px solid #212121',
    boxSizing: 'border-box',
    borderRadius: 10,
  },

  mobileStepBlock: {
    marginTop: 35,

    paddingTop: 20,
    paddingLeft: 26,
    paddingRight: 12,
    paddingBottom: 22,
  },
  desktopStepBlock: {
    marginTop: 50,

    paddingTop: 20,
    paddingLeft: 28,
    paddingRight: 40,
    paddingBottom: 26,
  },

  title: {
    lineHeight: '27px',
    color: '#FFF',
  },
  mobileTitle: {
    fontSize: 22,
    marginBottom: 26,
  },
  desktopTitle: {
    fontSize: 30,
    marginBottom: 28,
  },

  stepList: {
    display: 'flex',
    flexDirection: 'column',

    rowGap: 26,
  },

  stepItem: {
    display: 'flex',
    columnGap: 12,
  },

  icon: {
    width: 24,
  },

  stepText: {
    display: 'flex',
    flexDirection: 'column',

    rowGap: 5,
  },

  stepTitle: {
    color: '#FFF',
  },
  mobileStepTitle: {
    fontSize: 16,
    lineHeight: '19px',
  },
  desktopStepTitle: {
    fontSize: 20,
    lineHeight: '23px',
  },

  stepDescription: {
    fontSize: 12,
    lineHeight: '14px',
    color: '#FFF',
    opacity: 0.4,
  },

  downloadBtn: {
    width: 170,
    height: 50,

    background: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    borderRadius: 39,

    '&.MuiButton-contained': {
      color: '#000',
      '&:before': {
        transform: 'none',
        transition: 'none',
      },
    },

    marginTop: 44,
  },

  notice: {
    fontSize: 12,
    lineHeight: '14px',
    color: '#FFF',
    opacity: 0.4,

    marginTop: 20,
  },
}));
