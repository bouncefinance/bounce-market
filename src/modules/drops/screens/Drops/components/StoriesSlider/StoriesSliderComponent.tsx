import { useTheme } from '@material-ui/core';
import { StoriesContainer } from 'modules/drops/components/StoriesContainer';
import { Section } from 'modules/uiKit/Section';
import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useStoriesSliderStyles } from './useStoriesSliderStyles';

interface IStoriesSliderProps {
  children: ReactNode;
  itemCount: number;
}

export const StoriesSliderComponent = ({
  children,
  itemCount,
}: IStoriesSliderProps) => {
  const classes = useStoriesSliderStyles();
  const theme = useTheme();

  const isFewSlides = itemCount > 1;

  const sliderProps: Swiper = {
    slidesPerView: 1,
    spaceBetween: theme.spacing(2),
    breakpoints: {
      [theme.breakpoints.values.md]: {
        spaceBetween: theme.spacing(3.5),
      },
      [theme.breakpoints.values.xl]: {
        slidesPerView: isFewSlides ? 2 : 1,
        spaceBetween: theme.spacing(3.5),
      },
    },
  };

  const modifyChildren = (child: ReactNode) => (
    <SwiperSlide className={classes.slide}>{child}</SwiperSlide>
  );

  return (
    <Section pt={{ xs: 7.5, md: 14 }} className={classes.root}>
      <StoriesContainer>
        {isFewSlides && (
          <Swiper {...sliderProps} className={classes.slider}>
            {React.Children.map(children, modifyChildren)}
          </Swiper>
        )}

        {!isFewSlides && children}
      </StoriesContainer>
    </Section>
  );
};
