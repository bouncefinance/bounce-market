import { makeStyles, Theme } from '@material-ui/core';
import { PROFILE_AVATAR_SIZE } from 'modules/profile/components/Avatar/useAvatarStyles';

export const useBrandStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: 0,
  },

  avatar: {
    marginTop: -PROFILE_AVATAR_SIZE / 2,
    marginBottom: theme.spacing(5),
  },
}));
