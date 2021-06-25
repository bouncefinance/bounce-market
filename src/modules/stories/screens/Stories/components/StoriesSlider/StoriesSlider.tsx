import { Container, useTheme } from '@material-ui/core';
import classNames from 'classnames';
import { Section } from 'modules/uiKit/Section';
import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useStoriesSliderStyles } from './useStoriesSliderStyles';

interface IStoriesSliderProps {
  className?: string;
  children: ReactNode;
  itemCount: number;
}

export const StoriesSlider = ({
  className,
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

  const modifyChildren = (child: any) => (
    <SwiperSlide className={classes.slide}>{child}</SwiperSlide>
  );

  return (
    <Section
      pt={{ xs: 7.5, md: 14 }}
      className={classNames(classes.root, className)}
    >
      <Container>
        {isFewSlides && (
          <Swiper {...sliderProps} className={classes.slider}>
            {React.Children.map(children, modifyChildren)}
          </Swiper>
        )}

        {!isFewSlides && children}
      </Container>
    </Section>
  );
};
