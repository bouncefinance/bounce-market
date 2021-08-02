import { Container, Grid } from '@material-ui/core';
import classNames from 'classnames';
import { ProductCardCategoryType } from 'modules/common/components/ProductCard';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { QueryLoadingCentered } from 'modules/common/components/QueryLoading/QueryLoading';
import { ISectionProps, Section } from 'modules/uiKit/Section';
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
import { IPromoCardProps, PromoCard } from '../PromoCard';
import { PromoThumb } from '../PromoThumb';
import { usePromoStyles } from './PromoStyles';

SwiperCore.use([Pagination, EffectFade, Thumbs, Lazy, Autoplay]);
const paginationId = 'pagination-alksjd';

export interface IPromoItem extends IPromoCardProps {
  thumbImg: string;
  category: ProductCardCategoryType;
}

interface IPromoProps extends ISectionProps {
  className?: string;
  items?: IPromoItem[];
  isLoading?: boolean;
  error?: any;
}

export const Promo = ({
  className,
  items = [],
  isLoading = false,
  error,
  ...sectionProps
}: IPromoProps) => {
  const classes = usePromoStyles();
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
    loop: items.length > 2,
    centeredSlides: items.length > 2,
    slideToClickedSlide: true,
    loopAdditionalSlides: 0,
    slidesPerView: 3,
    direction: 'vertical',
    onSwiper: setSwiperThumbs,
  };

  const renderedItems = items.map(cardProps => {
    return (
      <SwiperSlide key={uid(cardProps)} className={classes.slide}>
        <PromoCard
          {...cardProps}
          MediaProps={{
            category: cardProps.category,
            src: cardProps.img,
            imgClassName: 'swiper-lazy',
            isNativeLazyLoading: false,
            objectFit: 'scale-down',
          }}
        />
      </SwiperSlide>
    );
  });

  const renderedThumbs = items.map(
    ({ thumbImg, title, category, ...props }) => {
      return (
        <SwiperSlide key={uid(props)} className={classes.thumbsSlide}>
          <PromoThumb
            img={thumbImg}
            title={title}
            className={classes.thumb}
            MediaProps={{
              category: category,
              src: thumbImg,
              imgClassName: 'swiper-lazy',
              isNativeLazyLoading: false,
              objectFit: 'scale-down',
            }}
          />
        </SwiperSlide>
      );
    },
  );

  return (
    <Section
      {...sectionProps}
      pt={{ md: 11 }}
      className={classNames(classes.root, className)}
    >
      <Container className={classes.container}>
        {isLoading && <QueryLoadingCentered />}

        {!isLoading && error && <QueryError error={error} />}

        {!isLoading && items.length && (
          <Grid container alignItems="center">
            <Grid item xs={12} lg={9}>
              <Swiper {...sliderParams} className={classes.slider}>
                {renderedItems}
              </Swiper>

              <div className={classes.pagination} id={paginationId} />
            </Grid>

            <Grid item lg={3} className={classes.thumbsCol}>
              <Swiper {...thumbsParams} className={classes.thumbs}>
                {renderedThumbs}
              </Swiper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Section>
  );
};
