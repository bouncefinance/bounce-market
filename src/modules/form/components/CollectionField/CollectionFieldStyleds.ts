import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core';

export const useCollectionFieldStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > p': {
        marginLeft: 0,
        marginRight: 0,
      },
    },
  }),
);
