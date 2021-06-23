import { Container, Grid } from '@material-ui/core';
import { Section } from 'modules/uiKit/Section';
import React from 'react';
import { uid } from 'react-uid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PromoCardSkeleton } from '../PromoCard';
import { PromoThumbSkeleton } from '../PromoThumb';
import { usePromoStyles } from './PromoStyles';

export const PromoSkeleton = () => {
  const classes = usePromoStyles();

  const thumbsParams: Swiper = {
    loop: true,
    centeredSlides: true,
    slideToClickedSlide: true,
    loopAdditionalSlides: 0,
    slidesPerView: 3,
    direction: 'vertical',
  };

  const renderedThumbs = Array.from(
    Array(thumbsParams.slidesPerView).keys(),
  ).map(item => {
    return (
      <SwiperSlide key={uid(item)} className={classes.thumbsSlide}>
        <PromoThumbSkeleton className={classes.thumbsSlide} />
      </SwiperSlide>
    );
  });

  return (
    <Section pt={{ md: 11 }} className={classes.root}>
      <Container className={classes.container}>
        <Grid container alignItems="center">
          <Grid item xs={12} lg={9}>
            <PromoCardSkeleton />
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
