import { makeStyles, Theme } from '@material-ui/core';

export const useCollectionCardStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(5, 3),
    borderRadius: 20,

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 7, 6, 8),
    },
  },

  row: {
    minHeight: 270,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },

  logo: {
    width: 64,
    height: 64,
    marginRight: theme.spacing(2),
  },

  title: {
    textTransform: 'uppercase',
  },

  descr: {
    marginBottom: theme.spacing(3),
    maxHeight: 95,
    overflow: 'hidden',
    fontSize: 16,
    display: '-webkit-box' /*盒子模型微弹性伸缩模型*/,
    '-webkit-box-orient': 'vertical' /*伸缩盒子的子元素垂直排列*/,
    '-webkit-line-clamp': 4 /*文本显示4行*/,
  },
  optionBtn: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 15,
    fontWeight: 500,
    color: 'rgba(0,0,0,.5)',
  },
  showStandard: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 40,
    '& > span': {
      marginLeft: 12,
    },
  },
  showRoyalty: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingRight: 12,
    marginRight: 12,
    '& > span': {
      marginLeft: 12,
    },
  },
  changeBtn: {
    cursor: 'pointer',
  },
}));
