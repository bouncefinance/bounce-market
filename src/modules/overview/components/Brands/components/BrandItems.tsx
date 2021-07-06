import { Box, Typography, useTheme } from '@material-ui/core';
import { Img } from 'modules/uiKit/Img';
import classNames from 'classnames';
import { useDispatchRequest } from '@redux-requests/react';
import { IItem } from 'modules/pools/actions/queryItemByFilter';
import { QueryLoading } from 'modules/common/components/QueryLoading/QueryLoading';
import SwiperCore, { Lazy, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getRandomId } from 'modules/common/utils/getRandomId';
import { useMemo, useState, useEffect } from 'react';
import { queryBrandPools } from 'modules/brand/actions/queryBrandPools';
import { uid } from 'react-uid';
import { t } from 'modules/i18n/utils/intl';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import { useBrandItemsStyles } from './useBrandItemsStyules';

SwiperCore.use([Lazy, Navigation]);

export const BrandItems = ({
  imgUrl,
  brandName,
  ownerAddress,
  contractAddress,
}: {
  imgUrl: string;
  brandName: string;
  ownerAddress: string;
  contractAddress: string;
}) => {
  const dispatch = useDispatchRequest();
  const theme = useTheme();
  const classes = useBrandItemsStyles();

  const [items, setItems] = useState<IItem[]>([]);
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [loading, setLoading] = useState(false);

  const prevId = useMemo(() => getRandomId('prev'), []);
  const nextId = useMemo(() => getRandomId('next'), []);

  const hasItems = !!items.length;

  useEffect(() => {
    setLoading(true);
    dispatch(
      queryBrandPools({
        owneraddress: ownerAddress,
        contractaddress: contractAddress,
      }),
    ).then(res => {
      setLoading(false);
      if (res.data) {
        setItems(res.data);
      }
    });
  }, [contractAddress, dispatch, ownerAddress]);

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

  const renderedLoading = (
    <Box display="flex" justifyContent="center">
      <QueryLoading />
    </Box>
  );

  const renderedNoItems = (
    <Typography variant="body2" color="textSecondary">
      {t('brands.no-items')}
    </Typography>
  );

  return (
    <>
      <div className={classes.row}>
        <Img
          src={imgUrl}
          className={classes.brandImgWrap}
          isNativeLazyLoading={false}
          objectFit="scale-down"
          imgClassName="swiper-lazy"
        />
        <div className={classes.item}>
          <div className={classes.name}>{brandName}</div>
          {items.length > 0 && (
            <div className={classes.count}>
              {t('brands.items', { num: items.length })}
            </div>
          )}
        </div>
      </div>
      <div className={classes.container}>
        {loading && renderedLoading}

        {hasItems && !loading && rendered}

        {!hasItems && !loading && renderedNoItems}
      </div>
    </>
  );
};
