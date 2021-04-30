import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const useBrandCardStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 300,
    textAlign: 'center'
  },

  createNewMiniBtnWrap: {
    textAlign: 'right'
  },
  createNewMiniBtn: {
    margin: theme.spacing(2, 2, 0),
    width: 50,
    height: 50,
    minWidth: 'auto',
    border: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    fontSize: 16,
    borderRadius: '100%',
    color: '#a09fa0'
  },

  imgBox: {
    position: 'relative',
    display: 'block',
    margin: theme.spacing(4, 0, 1),
    '$createNewMiniBtnWrap + a > &': {
      marginTop: 0,
    }
  },

  imgWrap: {
    overflow: 'hidden',
    borderRadius: '100%',
    width: '104px',
    height: '104px',
    margin: theme.spacing(0, 'auto'),
    '&:after': {
      content: `''`,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',

      background: fade(theme.palette.common.black, 0),
      transition: '0.2s',
    },

    '$wrapLink:hover &': {
      '&:after': {
        background: fade(theme.palette.common.black, 0.2),
      },
    },
  },

  wrapLink: {},
  content: {},

  contentEmpty: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1
  },

  title: {
    marginBottom: 0,
    fontSize: 24,
  },

  subTitle: {
    fontSize: 15
  },
  addNewBtn: {
    width: 'auto',
    minHeight: 50,
    margin: theme.spacing(0, 'auto', 3),
    border: `solid ${fade(theme.palette.text.primary, 0.1)}`,
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    '& .MuiButton-startIcon': {
      marginTop: '-0.1em'
    }
  },
  btnMarginVNone: {
    marginTop: 0,
    marginBottom: 0
  },
  iconInheritFontSize: {
    fontSize: 'inherit !important'
  }
}));