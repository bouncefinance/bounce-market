import {
  Box,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import classNames from 'classnames';
import { AuctionType } from 'modules/api/common/auctionType';
import { queryBrandPools } from 'modules/brand/actions/queryBrandPools';
import { AngleLeftIcon } from 'modules/common/components/Icons/AngleLeftIcon';
import { AngleRightIcon } from 'modules/common/components/Icons/AngleRightIcon';
import { QueryLoading } from 'modules/common/components/QueryLoading/QueryLoading';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import { VideoPlayer } from 'modules/common/components/VideoPlayer';
import { getRandomId } from 'modules/common/utils/getRandomId';
import { t } from 'modules/i18n/utils/intl';
import { NFTCategoryType } from 'modules/overview/actions/fetchItemsByFilter';
import { IItem } from 'modules/pools/actions/queryItemByFilter';
import { Img } from 'modules/uiKit/Img';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { uid } from 'react-uid';
import SwiperCore, { Lazy, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCollectionNFTItemsStyles } from './useCollectionNFTItemsStyles';

SwiperCore.use([Lazy, Navigation]);

interface IBrandNFTItemsProps {
  className?: string;
  ownerAddress: string;
  contractAddress: string;
}

interface ISwiperItem extends IItem {
  auctionType?: AuctionType;
  poolId?: number;
  href: string;
}

export const CollectionNFTItems = ({
  className,
  ownerAddress,
  contractAddress,
}: IBrandNFTItemsProps) => {
  const classes = useCollectionNFTItemsStyles();
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [items, setItems] = useState<ISwiperItem[]>([]);
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [loading, setLoading] = useState(false);

  const prevId = useMemo(() => getRandomId('prev'), []);
  const nextId = useMemo(() => getRandomId('next'), []);

  const hasItems = !!items.length;

  useEffect(() => {
    setLoading(true);
    dispatchRequest(
      queryBrandPools({
        owneraddress: ownerAddress,
        contractaddress: contractAddress,
      }),
    ).then(res => {
      setLoading(false);
      setItems(res.data || []);
    });

    return function reset() {
      dispatch(resetRequests([queryBrandPools.toString()]));
    };
  }, [contractAddress, dispatch, ownerAddress, dispatchRequest]);

  useEffect(() => {
    if (items.length && swiper !== null) {
      swiper.update();
      swiper.lazy.load();
    }

    return () => {};
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
      items.map(({ itemname, fileurl, category, href }, i) => (
        <SwiperSlide className={classes.slide} key={uid(itemname, i)}>
          <div className={classes.item}>
            <Paper className={classes.itemImgFrame} variant="outlined">
              <Link to={href}>
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
                      <VideoPlayer src={fileurl} objectFit="scale-down" />
                    </div>
                  </div>
                )}
              </Link>

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
      {t('collections.no-items')}
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
