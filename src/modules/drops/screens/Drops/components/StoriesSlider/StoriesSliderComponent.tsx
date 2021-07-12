import { useTheme } from '@material-ui/core';
import { DropsContainer } from 'modules/drops/components/DropsContainer';
import { Section } from 'modules/uiKit/Section';
import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useStoriesSliderStyles } from './useStoriesSliderStyles';

interface IStoriesSliderProps {
  children: ReactNode;
  isSlider?: boolean;
}

export const StoriesSliderComponent = ({
  children,
  isSlider,
}: IStoriesSliderProps) => {
  const classes = useStoriesSliderStyles();
  const theme = useTheme();

  const sliderProps: Swiper = {
    slidesPerView: 1,
    spaceBetween: theme.spacing(2),
    breakpoints: {
      [theme.breakpoints.values.md]: {
        spaceBetween: theme.spacing(3.5),
      },
      [theme.breakpoints.values.xl]: {
        slidesPerView: isSlider ? 2 : 1,
        spaceBetween: theme.spacing(3.5),
      },
    },
  };

  const modifyChildren = (child: ReactNode) => (
    <SwiperSlide className={classes.slide}>{child}</SwiperSlide>
  );

  return (
    <Section pt={{ xs: 7.5, md: 14 }} className={classes.root}>
      <DropsContainer>
        {isSlider && (
          <Swiper {...sliderProps} className={classes.slider}>
            {React.Children.map(children, modifyChildren)}
          </Swiper>
        )}

        {!isSlider && children}
      </DropsContainer>
    </Section>
  );
};
