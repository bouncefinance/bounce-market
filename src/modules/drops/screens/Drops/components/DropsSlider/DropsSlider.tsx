import { Container, useTheme } from '@material-ui/core';
import classNames from 'classnames';
import { Section } from 'modules/uiKit/Section';
import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDropsSliderStyles } from './useDropsSliderStyles';

interface IDropsSliderProps {
  className?: string;
  children: ReactNode;
  itemCount: number;
}

export const DropsSlider = ({
  className,
  children,
  itemCount,
}: IDropsSliderProps) => {
  const classes = useDropsSliderStyles();
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
    <Section pt={{ md: 14 }} className={classNames(classes.root, className)}>
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
