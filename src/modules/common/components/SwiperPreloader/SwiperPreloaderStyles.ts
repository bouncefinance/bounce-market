import { makeStyles, Theme } from '@material-ui/core/styles';

export const useSwiperPreloaderStyles = makeStyles<Theme>(theme => ({
  root: {
    '--swiper-theme-color': theme.palette.text.primary,
  },
}));
