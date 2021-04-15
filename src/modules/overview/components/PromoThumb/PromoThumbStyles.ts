import { makeStyles, Theme } from '@material-ui/core/styles';

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
}));
