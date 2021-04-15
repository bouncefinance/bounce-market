import { makeStyles, Theme } from '@material-ui/core/styles';

const MAX_TITLE_LINES = 3;

export const usePromoThumbStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    display: 'grid',
    gridTemplateColumns: '64px 1fr',
    gap: theme.spacing(0, 2.5),
    alignItems: 'center',
  },

  imgWrap: {
    borderRadius: 8,
  },

  title: {
    lineHeight: 1.4,
    maxHeight: `${MAX_TITLE_LINES * 1.4}em`,
    overflow: 'hidden',
  },
}));
