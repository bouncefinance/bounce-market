import {Box, Container, Grid, Hidden, Typography} from '@material-ui/core';
import classNames from 'classnames';
import { Skeleton } from '@material-ui/lab';
import { Section } from 'modules/uiKit/Section';
import React, { useState } from 'react';
import { uid } from 'react-uid';
import SwiperCore, {
  Autoplay,
  EffectFade,
  Lazy,
  Pagination,
  Thumbs,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { usePromoStyles } from '../Promo/PromoStyles';
import * as cardStylesHooks from '../PromoCard/PromoCardStyles';
import * as thumbStylesHooks from '../PromoThumb/PromoThumbStyles';

SwiperCore.use([Pagination, EffectFade, Thumbs, Lazy, Autoplay]);
const paginationId = 'pagination-alksjd';


export const PromoSkeleton = () => {
  const classes = usePromoStyles();
  const cardClasses = cardStylesHooks.usePromoCardStyles();
  const thumbClasses = thumbStylesHooks.usePromoThumbStyles();
  const [swiperThumbs, setSwiperThumbs] = useState<SwiperCore>();

  const sliderParams: Swiper = {
    loop: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    effect: 'fade',
    slidesPerView: 1,
    pagination: {
      clickable: true,
      el: `#${paginationId}`,
      bulletClass: classes.bullet,
      bulletActiveClass: classes.bulletActive,
    },
    lazy: true,
    thumbs: { swiper: swiperThumbs },
    autoplay: {
      delay: 5000,
    },
    onSlideChange: swiper => {
      // slides visibility bugfix
      swiper.update();
    },
  };

  const thumbsParams: Swiper = {
    loop: true,
    centeredSlides: true,
    slideToClickedSlide: true,
    loopAdditionalSlides: 0,
    slidesPerView: 3,
    direction: 'vertical',
    onSwiper: setSwiperThumbs,
  };

  const createThumbSkeleton = () => {
    return (
        <div className={classNames(thumbClasses.root, classes.thumbsSlide)}>
          <Skeleton className={thumbClasses.imgWrap} width={"64px"} height={"64px"} variant="rect" />
          <Skeleton className={thumbClasses.title} width={"50%"} variant="text" />
        </div>
    );
  };

  const renderedThumbs = Array.from(Array(thumbsParams.slidesPerView).keys()).map((item) => {
    return (
      <SwiperSlide key={uid(item)} className={classes.thumbsSlide}>
        {createThumbSkeleton()}
      </SwiperSlide>
    );
  });

  const createCardSkeleton = () => {
    return (
        <div className={cardClasses.root}>
          <div className={cardClasses.content}>
            <Skeleton className={cardClasses.title} variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <div className={cardClasses.info}>
              <Box className={cardClasses.author}>
                <Skeleton className={cardClasses.avatar} variant="circle" width={"40px"} height={"40px"} />
                <Skeleton className={cardClasses.authorText} variant="text" />
                <Skeleton className={cardClasses.authorName} variant="text" />
              </Box>

              <Skeleton className={cardClasses.price} variant="text" width={"50px"}/>
            </div>
          </div>

          <Box position="relative">
            <Skeleton className={cardClasses.imgWrap} height={"360px"} variant="rect" />
          </Box>
        </div>
    );
  };

  return (
    <Section
      pt={{ md: 11 }}
      className={classes.root}
    >
      <Container className={classes.container}>
        <Grid container alignItems="center">
          <Grid item xs={12} lg={9}>
            {createCardSkeleton()}

            <div className={classes.pagination} id={paginationId} />
          </Grid>

          <Grid item lg={3} className={classes.thumbsCol}>
            <Swiper {...thumbsParams} className={classes.thumbs}>
              {renderedThumbs}
            </Swiper>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
};
