import { Box, Container, Grid, IconButton, Typography, useTheme } from '@material-ui/core';
import classNames from 'classnames';
import { AngleLeftIcon } from 'modules/common/components/Icons/AngleLeftIcon';
import { AngleRightIcon } from 'modules/common/components/Icons/AngleRightIcon';
import { ProductCardSkeleton } from 'modules/common/components/ProductCard';
import { getRandomId } from 'modules/common/utils/getRandomId';
import { t } from 'modules/i18n/utils/intl';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import React, { ReactNode, useEffect, useState } from 'react';
import { uid } from 'react-uid';
import SwiperCore, { Lazy, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMoversStyles } from './MoversStyles';

SwiperCore.use([Lazy, Navigation]);
const prevId = getRandomId('prev');
const nextId = getRandomId('next');

interface IMoversProps extends ISectionProps {
  isLoading?: boolean;
  children: ReactNode;
  itemCount: number;
}

export const MoversComponent = ({
  className,
  isLoading,
  children,
  itemCount,
  ...sectionProps
}: IMoversProps) => {
  const classes = useMoversStyles();
  const theme = useTheme();
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  useEffect(() => {
    if (itemCount && swiper !== null) {
      swiper.update();
      swiper.lazy.load();
    }
  }, [itemCount, swiper]);

  const sliderProps: Swiper = {
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    spaceBetween: 30,
    lazy: true,
    loop: true,
    navigation: {
      prevEl: `#${prevId}`,
      nextEl: `#${nextId}`,
    },
    breakpoints: {
      [theme.breakpoints.values.xl]: {
        slidesPerView: 4,
      },
      [theme.breakpoints.values.HD]: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      [theme.breakpoints.values.WXGAPlus]: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
    onSwiper: setSwiper,
  };

  const modifyChildren = (child: ReactNode) => (
    <SwiperSlide className={classes.slide}>{child}</SwiperSlide>
  );

  const renderedSkeletons = Array(5)
    .fill(0)
    .map((_, i) => <ProductCardSkeleton key={uid(i)} />);

  return (
    <Section {...sectionProps} className={classNames(classes.root, className)}>
      <Container>
        <Box mb={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
              <Typography variant="h2">{t('movers.title')}</Typography>
            </Grid>

            <Grid item xs="auto">
              <div className={classes.buttons}>
                <IconButton id={prevId} className={classes.navBtn}>
                  <AngleLeftIcon className={classes.navBtnIcon} />
                </IconButton>

                <IconButton id={nextId} className={classes.navBtn}>
                  <AngleRightIcon className={classes.navBtnIcon} />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Box>

        {isLoading || !!itemCount ? (
          <Swiper {...sliderProps} className={classes.slider}>
            {React.Children.map(
              isLoading ? renderedSkeletons : children,
              modifyChildren,
            )}
          </Swiper>
        ) : (
          t('profile.no-items.title')
        )}
      </Container>
    </Section>
  );
};
