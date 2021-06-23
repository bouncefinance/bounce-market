import {Container, Grid} from '@material-ui/core';
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
import { usePromoStyles } from './PromoStyles';
import {PromoCardSkeleton} from "../PromoCard";
import {PromoThumbSkeleton} from "../PromoThumb";

SwiperCore.use([Pagination, EffectFade, Thumbs, Lazy, Autoplay]);
const paginationId = 'pagination-alksjd';


export const PromoSkeleton = () => {
  const classes = usePromoStyles();
  const [swiperThumbs, setSwiperThumbs] = useState<SwiperCore>();

  const thumbsParams: Swiper = {
    loop: true,
    centeredSlides: true,
    slideToClickedSlide: true,
    loopAdditionalSlides: 0,
    slidesPerView: 3,
    direction: 'vertical',
    onSwiper: setSwiperThumbs,
  };

  const renderedThumbs = Array.from(Array(thumbsParams.slidesPerView).keys()).map((item) => {
    return (
      <SwiperSlide key={uid(item)} className={classes.thumbsSlide}>
        <PromoThumbSkeleton className={classes.thumbsSlide}/>
      </SwiperSlide>
    );
  });

  return (
    <Section
      pt={{ md: 11 }}
      className={classes.root}
    >
      <Container className={classes.container}>
        <Grid container alignItems="center">
          <Grid item xs={12} lg={9}>
            <PromoCardSkeleton />
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
