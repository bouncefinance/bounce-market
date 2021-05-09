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

export type ProductProps = Omit<IProductCardProps, 'ImgProps'> & {
  img: string;
};

interface IMoversProps extends ISectionProps {
  items?: ProductProps[];
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
        slidesPerView: 5,
      },
    },
    onSwiper: setSwiper,
  };

  const renderedSlides = items.map(cardProps => (
    <SwiperSlide className={classes.slide} key={uid(cardProps)}>
      <ProductCard
        title={cardProps.title}
        price={cardProps.price}
        priceType={cardProps.priceType}
        endDate={cardProps.endDate}
        likes={cardProps.likes}
        href={cardProps.href}
        ImgProps={{
          src: cardProps.img,
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
