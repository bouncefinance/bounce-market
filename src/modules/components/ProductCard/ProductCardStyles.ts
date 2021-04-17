import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const useProductCardStyles = makeStyles<Theme>(theme => ({
  root: {
    maxWidth: 240,
  },

  imgLink: {
    position: 'relative',
    display: 'block',
  },

  imgWrap: {
    overflow: 'hidden',

    '& img': {
      transform: 'scale(1.05)',
      transition: 'all 0.3s ease',
    },

    '$imgLink:hover &': {
      '& img': {
        transform: 'scale(1)',
      },
    },
  },

  title: {
    marginBottom: theme.spacing(2),

    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },

  devider: {
    margin: theme.spacing(2, 0),
    border: `solid ${fade(theme.palette.text.primary, 0.1)}`,
    borderWidth: '1px 0 0',
  },

  price: {
    fontSize: 15,
    fontWeight: 700,
  },

  info: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr auto',
    gap: theme.spacing(0, 2),
    margin: theme.spacing(1.5, 0, 0),
  },

  status: {
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    fontSize: 16,
  },

  iconRightOffset: {
    marginRight: theme.spacing(1),
  },

  likes: {
    display: 'flex',
    alignItems: 'center',
  },

  likeBtn: {
    padding: 6,
    transition: 'all 0.2s',

    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  likeBtnActive: {
    color: 'red',
  },
}));
