import classNames from 'classnames';
import { useSwiperPreloaderStyles } from './SwiperPreloaderStyles';

export const SwiperPreloader = () => {
  const classes = useSwiperPreloaderStyles();
  return <div className={classNames('swiper-lazy-preloader', classes.root)} />;
};
