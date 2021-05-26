import { makeStyles, Theme } from '@material-ui/core/styles';

export const usePromoThumbStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '64px auto',
    gap: theme.spacing(0, 2.5),
    alignItems: 'center',
  },

  imgWrap: {
    borderRadius: 8,
  },

  title: {
    fontSize: 15,
    fontWeight: 500,
  },
}));
