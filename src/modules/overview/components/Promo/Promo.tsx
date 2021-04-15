import { Container, Grid } from '@material-ui/core';
import classNames from 'classnames';
import { INDEX_PATH } from 'modules/router/const';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import React, { useState } from 'react';
import { uid } from 'react-uid';
import SwiperCore, { EffectFade, Lazy, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { IPromoCardProps, PromoCard } from '../PromoCard';
import { PromoThumb } from '../PromoThumb';
import { usePromoStyles } from './PromoStyles';

SwiperCore.use([Pagination, EffectFade, Thumbs, Lazy]);
const paginationId = 'pagination-alksjd';

interface IPromoItem extends IPromoCardProps {
  thumbImg: string;
}

interface IPromoProps extends ISectionProps {
  className?: string;
  items: IPromoItem[];
}

export const PromoComponent = ({
  className,
  items,
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
    // simulateTouch: false,
    lazy: true,
    thumbs: { swiper: swiperThumbs },
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
      <SwiperSlide key={uid(cardProps.title)} className={classes.slide}>
        <PromoCard {...cardProps} />
      </SwiperSlide>
    );
  });

  const renderedThumbs = items.map(({ thumbImg, title }) => {
    return (
      <SwiperSlide key={uid(title)} className={classes.thumbsSlide}>
        <PromoThumb img={thumbImg} title={title} className={classes.thumb} />
      </SwiperSlide>
    );
  });

  return (
    <Section
      {...sectionProps}
      pt={{ md: 11 }}
      className={classNames(classes.root, className)}
    >
      <Container className={classes.container}>
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
      </Container>
    </Section>
  );
};

export const Promo = () => {
  const items: IPromoItem[] = [
    {
      title: 'Masters of relevance',
      text:
        'The Wave 3/20 "SMART" is dedicated to some projects building on blockchain and developed with great smartness.',
      createdBy: '1livinginzen',
      avatar: 'https://via.placeholder.com/40x40',
      price: '1 BNB',
      img: 'https://picsum.photos/seed/ss/360',
      thumbImg: 'https://picsum.photos/seed/ss/64',
      href: INDEX_PATH,
      authorHref: INDEX_PATH,
    },
    {
      title: 'test adsad asdasdsad asdasdsada',
      text: 'adsad asdasdsad asdasdsada sdasdsadasd.',
      createdBy: 'erwtwretwet',
      avatar: 'https://via.placeholder.com/40x40',
      price: '1 BNB',
      img: 'https://picsum.photos/seed/test/360',
      thumbImg: 'https://picsum.photos/seed/test/64',
      href: INDEX_PATH,
      authorHref: INDEX_PATH,
    },
  ];

  return <PromoComponent stackDown items={items} />;
};
