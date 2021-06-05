import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@material-ui/core';
import classNames from 'classnames';
import { AngleLeftIcon } from 'modules/common/components/Icons/AngleLeftIcon';
import { AngleRightIcon } from 'modules/common/components/Icons/AngleRightIcon';
import {
  IProductCardProps,
  ProductCard,
} from 'modules/common/components/ProductCard';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { QueryLoadingCentered } from 'modules/common/components/QueryLoading/QueryLoading';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import { getRandomId } from 'modules/common/utils/getRandomId';
import { t } from 'modules/i18n/utils/intl';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import React, { useEffect, useState } from 'react';
import { uid } from 'react-uid';
import SwiperCore, { Lazy, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMoversStyles } from './MoversStyles';

SwiperCore.use([Lazy, Navigation]);
const prevId = getRandomId('prev');
const nextId = getRandomId('next');

interface IMoversProps extends ISectionProps {
  items?: IProductCardProps[];
  isLoading?: boolean;
  error?: any;
}

export const Movers = ({
  className,
  items = [],
  isLoading,
  error,
  ...sectionProps
}: IMoversProps) => {
  const classes = useMoversStyles();
  const theme = useTheme();
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  useEffect(() => {
    if (items.length && swiper !== null) {
      swiper.update();
      swiper.lazy.load();
    }
  }, [items, swiper]);

  const sliderProps: Swiper = {
    loop: true,
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    spaceBetween: 30,
    lazy: true,
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
  const renderedSlides = items.map(cardProps => (
    <SwiperSlide className={classes.slide} key={uid(cardProps)}>
      <ProductCard
        isOnSale
        title={cardProps.title}
        price={cardProps.price}
        priceType={cardProps.priceType}
        endDate={cardProps.endDate}
        copies={cardProps.copies}
        likes={cardProps.likes}
        href={cardProps.href}
        MediaProps={{
          category: cardProps.MediaProps.category,
          src: cardProps.MediaProps.src,
          imgClassName: 'swiper-lazy',
          isNativeLazyLoading: false,
          objectFit: 'scale-down',
        }}
        ProfileInfoProps={cardProps.ProfileInfoProps}
        imgPreloader={<SwiperPreloader />}
      />
    </SwiperSlide>
  ));

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

        {isLoading && <QueryLoadingCentered />}

        {!isLoading && error && <QueryError error={error} />}

        {!isLoading && items.length && (
          <Swiper {...sliderProps} className={classes.slider}>
            {renderedSlides}
          </Swiper>
        )}
      </Container>
    </Section>
  );
};
