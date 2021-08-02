import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const useTabFollowingStyles = makeStyles<Theme>(theme => ({
  root: {},

  item: {
    display: 'grid',
    alignItems: 'center',

    padding: theme.spacing(2, 0),
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: fade(theme.palette.text.primary, 0.1),

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr auto',
    },
  },

  itemContentWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.up('sm')]: {
      justifyContent: 'start',
    },
  },

  itemAvatarLink: {
    paddingRight: 20,
  },

  itemAvatar: {
    width: 64,
    height: 64,
  },

  itemContent: {},

  itemUserNameLink: {},

  itemName: {
    fontSize: 18,
  },

  userFollowers: {
    marginTop: 5,
    fontSize: 13,
  },

  userFollowersIcon: {
    fontSize: 'inherit',
    verticalAlign: 'middle',
  },

  itemFollowWrap: {
    marginTop: theme.spacing(2),
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {
      marginTop: 0,
      textAlign: 'right',
    },
  },

  followButton: {
    minWidth: 180,
    minHeight: 50,
    fontSize: 16,
  },

  // FollowGroup styleds

  followGroup: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '32px',
    border: '1px solid rgba(0,0,0,.2)',
  },
  followBtn: {
    width: 140,
    height: 50,
  },
  followFont: {
    fontWeight: 500,
    color: 'rgba(0,0,0,.5)',
    cursor: 'pointer',
  },
  followers: {
    marginLeft: 18,
    marginRight: 12,
  },
  following: {
    marginLeft: 12,
    marginRight: 28,
  },
  divid: {
    width: 1,
    height: 26,
    borderLeft: '1px solid rgba(0,0,0,.2)',
  },
  addIcon: {
    width: 16,
    marginRight: 10,
  },
  h1: {
    margin: '0 auto',
  },
}));
