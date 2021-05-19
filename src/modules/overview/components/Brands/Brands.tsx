import { Box, Container, Grid, Typography, useTheme } from '@material-ui/core';
import classNames from 'classnames';
import { IBrandItem } from 'modules/brand/actions/fetchPopularBrands';
import { BrandRoutesConfig } from 'modules/brand/BrandRoutes';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { Img } from 'modules/uiKit/Img';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { uid } from 'react-uid';
import SwiperCore, { Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useBrandsStyles } from './BrandsStyles';

SwiperCore.use([Lazy]);

interface IBrandsProps extends ISectionProps {
  className?: string;
  items: IBrandItem[];
  isLoading?: boolean;
  error?: any;
}

export const Brands = ({
  className,
  items = [],
  isLoading,
  error,
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
      items.map(({ imgUrl, id }, i) => (
        <SwiperSlide className={classes.slide} key={uid(i)}>
          <div
            className={classNames(classes.brand, {
              [classes.brandLight]: i % 2 === 0,
              [classes.brandDark]: i % 2 === 1,
            })}
          >
            <Img
              src={imgUrl}
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

  const history = useHistory();
  const onViewBrand = () => {
    history.replace(BrandRoutesConfig.ListBrand.generatePath())
  }

  return (
    <Section {...sectionProps} className={classes.root}>
      <Container>
        <Box mb={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
              <Typography variant="h2">{t('brands.title')}</Typography>
            </Grid>

            <Grid item xs="auto">
              <Button variant="outlined" className={classes.moreBtn} rounded onClick={onViewBrand}>
                {t('common.view-all')}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Swiper {...sliderProps} className={classes.slider}>
          {renderedSlides}
        </Swiper>
      </Container>
    </Section>
  );
};