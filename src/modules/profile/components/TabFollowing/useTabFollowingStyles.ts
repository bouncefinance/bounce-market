import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const useTabFollowingStyles = makeStyles<Theme>(theme => ({
  root: {},

  item: {
    display: 'grid',
    alignItems: 'center',

    padding: theme.spacing(3, 0),
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
    width: 82,
    height: 82,
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
}));
