import { IconButton, Typography, useTheme } from '@material-ui/core';
import { AngleLeftIcon } from 'modules/common/components/Icons/AngleLeftIcon';
import { AngleRightIcon } from 'modules/common/components/Icons/AngleRightIcon';
import { getRandomId } from 'modules/common/utils/getRandomId';
import { StoriesContainer } from 'modules/drops/components/StoriesContainer';
import { Section } from 'modules/uiKit/Section';
import React, { ReactNode, useEffect, useState } from 'react';
import SwiperCore, { Lazy, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTopCreatorsStyles } from './useTopCreatorsStyles';

SwiperCore.use([Lazy, Navigation]);

const prevId = getRandomId('prev');
const nextId = getRandomId('next');

interface ITopCreatorsProps {
  itemsCount: number;
  children: ReactNode;
  loading?: boolean;
}

export const TopCreatorsComponent = ({
  itemsCount,
  children,
  loading,
}: ITopCreatorsProps) => {
  const classes = useTopCreatorsStyles();
  const theme = useTheme();
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  useEffect(() => {
    if (!!itemsCount && swiper !== null) {
      swiper.update();
      swiper.lazy.load();
    }
  }, [itemsCount, swiper, loading]);

  const sliderProps: Swiper = {
    watchSlidesVisibility: true,
    slidesPerView: 'auto',
    spaceBetween: theme.spacing(2.5),
    lazy: true,
    navigation: {
      prevEl: `#${prevId}`,
      nextEl: `#${nextId}`,
    },
    breakpoints: {
      [theme.breakpoints.values.md]: {
        spaceBetween: theme.spacing(6),
      },
      [theme.breakpoints.values.xl]: {
        slidesPerView: 7,
        spaceBetween: theme.spacing(6),
      },
    },
    onSwiper: setSwiper,
  };

  const modifyChildren = (child: ReactNode) => (
    <SwiperSlide className={classes.slide}>{child}</SwiperSlide>
  );

  return (
    <Section pt={{ xs: 2, md: 3 }} className={classes.root}>
      <StoriesContainer>
        <div className={classes.header}>
          <IconButton id={prevId} className={classes.navBtn}>
            <AngleLeftIcon className={classes.navBtnIcon} />
          </IconButton>

          <Typography className={classes.title} variant="h2">
            Top Creators
          </Typography>

          <IconButton id={nextId} className={classes.navBtn}>
            <AngleRightIcon className={classes.navBtnIcon} />
          </IconButton>
        </div>

        <Swiper {...sliderProps} className={classes.slider}>
          {React.Children.map(children, modifyChildren)}
        </Swiper>
      </StoriesContainer>
    </Section>
  );
};
