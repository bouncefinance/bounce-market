import { makeStyles, Theme } from '@material-ui/core/styles';

export const useTabBrandStyles = makeStyles<Theme>(() => ({
  root: {
    paddingTop: 5,
  },

  headerGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  addNftBtn: {
    width: 193,
    height: 50,
  },
  addNftBtnIcon: {
    width: 16,
    marginRight: 10,
  },
}));
