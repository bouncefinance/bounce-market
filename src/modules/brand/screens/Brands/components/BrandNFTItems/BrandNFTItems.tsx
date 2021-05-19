import {
  Box,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import classNames from 'classnames';
import { queryBrandPools } from 'modules/brand/actions/queryBrandPools';
import { AngleLeftIcon } from 'modules/common/components/Icons/AngleLeftIcon';
import { AngleRightIcon } from 'modules/common/components/Icons/AngleRightIcon';
import { QueryLoading } from 'modules/common/components/QueryLoading/QueryLoading';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import { getRandomId } from 'modules/common/utils/getRandomId';
import { t } from 'modules/i18n/utils/intl';
import { NFTCategoryType } from 'modules/overview/actions/fetchItemsByFilter';
import { IItem } from 'modules/pools/actions/queryItemByFilter';
import { Img } from 'modules/uiKit/Img';
import React, { useEffect, useMemo, useState } from 'react';
import { uid } from 'react-uid';
import SwiperCore, { Lazy, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useBrandNFTItemsStyles } from './useBrandNFTItemsStyles';
import { VideoPlayer } from '../../../../../common/components/VideoPlayer';

SwiperCore.use([Lazy, Navigation]);

interface IBrandNFTItemsProps {
  className?: string;
  ownerAddress: string;
  contractAddress: string;
}

export const BrandNFTItems = ({
  className,
  ownerAddress,
  contractAddress,
}: IBrandNFTItemsProps) => {
  const classes = useBrandNFTItemsStyles();
  const dispatch = useDispatchRequest();
  const theme = useTheme();
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
      setItems(res.data);
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
    spaceBetween: 30,
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
        slidesPerView: 3,
      },
    },
  };

  const renderedSlides = useMemo(
    () =>
      items.map(({ itemname, fileurl, category }, i) => (
        <SwiperSlide className={classes.slide} key={uid(itemname, i)}>
          <div className={classes.item}>
            <Paper className={classes.itemImgFrame} variant="outlined">
              {category === NFTCategoryType.image ? (
                <Img
                  className={classes.itemImgBox}
                  src={fileurl}
                  objectFit="scale-down"
                  ratio="1x1"
                  isNativeLazyLoading={false}
                  imgClassName="swiper-lazy"
                />
              ) : (
                <div className={classes.videoWrapper}>
                  <div className={classNames(classes.video, 'swiper-lazy')}>
                    <VideoPlayer src={fileurl} />
                  </div>
                </div>
              )}

              <SwiperPreloader />
            </Paper>

            <div className={classes.itemTitle}>{itemname}</div>
          </div>
        </SwiperSlide>
      )),
    [classes, items],
  );

  const renderedLoading = (
    <Box display="flex" justifyContent="center">
      <QueryLoading />
    </Box>
  );

  const rendered = (
    <div className={classNames(classes.root, className)}>
      <Swiper {...sliderProps} className={classes.slider}>
        {renderedSlides}
      </Swiper>

      <div className={classes.buttons}>
        <IconButton id={prevId} className={classes.navBtn}>
          <AngleLeftIcon fontSize="small" />
        </IconButton>

        <IconButton id={nextId} className={classes.navBtn}>
          <AngleRightIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );

  const renderedNoItems = (
    <Typography variant="body2" color="textSecondary">
      {t('brands.no-items')}
    </Typography>
  );

  return (
    <>
      {loading && renderedLoading}

      {hasItems && !loading && rendered}

      {!hasItems && !loading && renderedNoItems}
    </>
  );
};
