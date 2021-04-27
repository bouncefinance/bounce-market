import { Box, Grid, Typography, useTheme } from '@material-ui/core';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { Img } from 'modules/uiKit/Img';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useEffect, useMemo, useState } from 'react';
import { uid } from 'react-uid';
import SwiperCore, { Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { WideContainer } from '../WideContainer';
import alpacaLogo from './assets/alpaca.svg';
import darkHorseLogo from './assets/darkHorse.svg';
import polkaPetLogo from './assets/polkaPet.svg';
import rockiLogo from './assets/rocki.svg';
import sociosLogo from './assets/socios.svg';
import { useBrandsStyles } from './BrandsStyles';

SwiperCore.use([Lazy]);

interface IBrandItemProps {
  img: string;
  theme?: 'light' | 'dark';
}

interface IBrandsProps extends ISectionProps {
  className?: string;
  items: IBrandItemProps[];
}

export const BrandsComponent = ({
  className,
  items,
  ...sectionProps
}: IBrandsProps) => {
  const classes = useBrandsStyles();
  const theme = useTheme();
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  useEffect(() => {
    if (items.length && swiper !== null) {
      swiper.update();
      swiper.lazy.load();
    }
  }, [items, swiper]);

  const sliderProps: Swiper = {
    watchSlidesVisibility: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    lazy: true,
    breakpoints: {
      [theme.breakpoints.values.xl]: {
        slidesPerView: 6,
      },
    },
    onSwiper: setSwiper,
  };

  const renderedSlides = useMemo(
    () =>
      items.map(({ img, theme = 'light' }, i) => (
        <SwiperSlide className={classes.slide} key={uid(i)}>
          <div
            className={classNames(classes.brand, {
              [classes.brandLight]: theme === 'light',
              [classes.brandDark]: theme === 'dark',
            })}
          >
            <Img
              src={img}
              className={classes.brandImgWrap}
              isNativeLazyLoading={false}
              objectFit="scale-down"
              imgClassName="swiper-lazy"
            />
          </div>
        </SwiperSlide>
      )),
    [classes, items],
  );

  return (
    <Section {...sectionProps} className={classes.root}>
      <WideContainer>
        <Box mb={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
              <Typography variant="h2">{t('brands.title')}</Typography>
            </Grid>

            <Grid item xs="auto">
              <Button variant="outlined" className={classes.moreBtn} rounded>
                {t('common.view-all')}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Swiper {...sliderProps} className={classes.slider}>
          {renderedSlides}
        </Swiper>
      </WideContainer>
    </Section>
  );
};

export const Brands = () => {
  const brands: IBrandItemProps[] = [
    {
      img: darkHorseLogo,
      theme: 'dark',
    },
    {
      img: sociosLogo,
      theme: 'light',
    },
    {
      img: alpacaLogo,
      theme: 'light',
    },
    {
      img: rockiLogo,
      theme: 'dark',
    },
    {
      img: polkaPetLogo,
      theme: 'light',
    },
  ];

  return <BrandsComponent items={brands} stackUp stackDown />;
};
