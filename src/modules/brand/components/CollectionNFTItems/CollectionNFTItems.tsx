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
import { INftItem, PlatformType } from 'modules/api/common/itemType';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { AngleLeftIcon } from 'modules/common/components/Icons/AngleLeftIcon';
import { AngleRightIcon } from 'modules/common/components/Icons/AngleRightIcon';
import { Queries } from 'modules/common/components/Queries/Queries';
import { QueryLoading } from 'modules/common/components/QueryLoading/QueryLoading';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import { VideoPlayer } from 'modules/common/components/VideoPlayer';
import { ResponseData } from 'modules/common/types/ResponseData';
import { getRandomId } from 'modules/common/utils/getRandomId';
import { t } from 'modules/i18n/utils/intl';
import { NFTCategoryType } from 'modules/overview/actions/fetchItemsByFilter';
import { fetchCollection } from 'modules/profile/actions/fetchCollection';
import { Img } from 'modules/uiKit/Img';
import React, { useEffect, useMemo, useState } from 'react';
import { useCallback } from 'react';
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

export const CollectionNFTItems = ({
  className,
  ownerAddress,
  contractAddress,
}: IBrandNFTItemsProps) => {
  const classes = useCollectionNFTItemsStyles();
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  const prevId = useMemo(() => getRandomId('prev'), []);
  const nextId = useMemo(() => getRandomId('next'), []);

  useEffect(() => {
    dispatch(
      fetchCollection(
        {
          address: ownerAddress,
          className: contractAddress,
          isPlatform: PlatformType.SELF,
        },
        { requestKey: contractAddress },
      ),
    );

    return function reset() {
      dispatch(
        resetRequests([
          {
            requestType: fetchCollection.toString(),
            requestKey: contractAddress,
          },
        ]),
      );
    };
  }, [contractAddress, dispatch, ownerAddress, dispatchRequest]);

  useEffect(() => {
    if (swiper !== null) {
      swiper.update();
      swiper.lazy?.load();
    }

    return () => {};
  }, [swiper]);

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

  const renderedSlides = useCallback(
    (collectionData: INftItem[]) => {
      return collectionData.map(
        (
          { name: itemname, fileUrl, category, tokenId, contractAddress },
          i,
        ) => (
          <SwiperSlide className={classes.slide} key={uid(itemname, i)}>
            <div className={classes.item}>
              <Paper className={classes.itemImgFrame} variant="outlined">
                <Link
                  to={BuyNFTRoutesConfig.Details_ITEM_NFT.generatePath(
                    tokenId,
                    contractAddress,
                  )}
                >
                  {category === NFTCategoryType.image ? (
                    <Img
                      className={classes.itemImgBox}
                      src={fileUrl}
                      objectFit="scale-down"
                      ratio="1x1"
                      isNativeLazyLoading={false}
                      imgClassName="swiper-lazy"
                    />
                  ) : (
                    <div className={classes.videoWrapper}>
                      <div className={classNames(classes.video, 'swiper-lazy')}>
                        <VideoPlayer src={fileUrl} objectFit="scale-down" />
                      </div>
                    </div>
                  )}
                </Link>

                <SwiperPreloader />
              </Paper>

              <div className={classes.itemTitle}>{itemname}</div>
            </div>
          </SwiperSlide>
        ),
      );
    },
    [classes],
  );

  const renderedLoading = (
    <Box display="flex" justifyContent="center">
      <QueryLoading />
    </Box>
  );

  const rendered = (collectionData: { total: number; list: INftItem[] }) => {
    return (
      <div className={classNames(classes.root, className)}>
        <Swiper {...sliderProps} className={classes.slider}>
          {renderedSlides(collectionData.list)}
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
  };

  const renderedNoItems = (
    <Typography variant="body2" color="textSecondary">
      {t('collections.no-items')}
    </Typography>
  );

  return (
    <Queries<ResponseData<typeof fetchCollection>>
      requestActions={[fetchCollection]}
      requestKeys={[contractAddress]}
      empty={renderedNoItems}
    >
      {({ data: collectionData, loading: collectionLoading }) => {
        return (
          <>{collectionLoading ? renderedLoading : rendered(collectionData)}</>
        );
      }}
    </Queries>
  );
};
