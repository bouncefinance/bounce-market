import { makeStyles, Theme } from '@material-ui/core';

export const useStoriesContainerStyles = makeStyles<Theme>(theme => ({
  root: {
    maxWidth: 1200 + theme.spacing(15),
  },
}));
