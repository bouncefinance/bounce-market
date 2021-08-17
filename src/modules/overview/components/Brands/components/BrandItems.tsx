import { Typography, useTheme } from '@material-ui/core';
import { Img } from 'modules/uiKit/Img';
import classNames from 'classnames';
import SwiperCore, { Lazy, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getRandomId } from 'modules/common/utils/getRandomId';
import { useMemo, useState, useEffect } from 'react';
import { uid } from 'react-uid';
import { t } from 'modules/i18n/utils/intl';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import { useBrandItemsStyles } from './useBrandItemsStyules';
import { IItemsInfo } from 'modules/brand/actions/fetchPopularBrands';

SwiperCore.use([Lazy, Navigation]);

export const BrandItems = ({
  imgUrl,
  brandName,
  items,
}: {
  imgUrl: string;
  brandName: string;
  items: IItemsInfo[];
}) => {
  const theme = useTheme();
  const classes = useBrandItemsStyles();

  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  const prevId = useMemo(() => getRandomId('prev'), []);
  const nextId = useMemo(() => getRandomId('next'), []);

  const hasItems = !!items.length;

  useEffect(() => {
    if (items.length && swiper !== null) {
      swiper.update();
      swiper.lazy.load();
    }
  }, [items, swiper]);

  const sliderProps: Swiper = {
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    spaceBetween: 8,
    lazy: true,
    onSwiper: setSwiper,
    navigation: {
      prevEl: `#${prevId}`,
      nextEl: `#${nextId}`,
    },
    breakpoints: {
      [theme.breakpoints.values.md]: {
        slidesPerView: 2,
      },
      [theme.breakpoints.values.xl]: {
        slidesPerView: 3.5,
      },
    },
  };

  const renderedSlides = useMemo(
    () =>
      items.map(({ itemname, fileurl }, i) => (
        <SwiperSlide className={classes.slide} key={uid(itemname, i)}>
          <div className={classes.item}>
            <Img
              className={classes.itemImgBox}
              src={fileurl}
              size="small"
              objectFit="scale-down"
              ratio="1x1"
              isNativeLazyLoading={false}
              imgClassName="swiper-lazy"
            />
            <SwiperPreloader />
          </div>
        </SwiperSlide>
      )),
    [classes, items],
  );

  const rendered = (
    <div className={classNames(classes.root)}>
      <Swiper {...sliderProps} className={classes.slider}>
        {renderedSlides}
      </Swiper>
    </div>
  );

  const renderedNoItems = (
    <Typography variant="body2" color="textSecondary">
      {t('collections.no-items')}
    </Typography>
  );

  return (
    <>
      <div className={classes.row}>
        <Img
          src={imgUrl}
          size="small"
          className={classes.brandImgWrap}
          isNativeLazyLoading={false}
          imgClassName="swiper-lazy"
        />
        <div className={classes.item}>
          <div className={classes.name}>{brandName}</div>
          {items.length > 0 && (
            <div className={classes.count}>
              {t('collections.items', { num: items.length })}
            </div>
          )}
        </div>
      </div>
      <div className={classes.container}>
        {/* {loading && renderedLoading} */}

        {hasItems && rendered}

        {!hasItems && renderedNoItems}
      </div>
    </>
  );
};
