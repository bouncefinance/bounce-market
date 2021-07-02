import { Box, Container, Grid, Typography, useTheme } from '@material-ui/core';
import { IBrandItem } from 'modules/brand/actions/fetchPopularBrands';
import { BrandRoutesConfig } from 'modules/brand/BrandRoutes';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import SwiperCore, { Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useBrandsStyles } from './BrandsStyles';
import { BrandItems } from './components';

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
    spaceBetween: theme.spacing(5),
    lazy: true,
    onSwiper: setSwiper,
  };

  const renderedSlides = useMemo(
    () =>
      items.map(
        ({ imgUrl, id, brandName, ownerAddress, contractAddress }, i) => (
          <SwiperSlide className={classes.slide} key={id}>
            <Link
              to={BrandRoutesConfig.Brand.generatePath(id)}
              className={classes.brand}
            >
              <BrandItems
                imgUrl={imgUrl}
                brandName={brandName}
                ownerAddress={ownerAddress}
                contractAddress={contractAddress}
              />
            </Link>
          </SwiperSlide>
        ),
      ),
    [classes, items],
  );

  const history = useHistory();
  const onViewBrand = () => {
    history.replace(BrandRoutesConfig.ListBrand.generatePath());
  };

  return (
    <Section {...sectionProps} className={classes.root}>
      <Container>
        <Box mb={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
              <Typography variant="h2">{t('overview.brands.title')}</Typography>
            </Grid>

            <Grid item xs="auto">
              <Button
                variant="outlined"
                className={classes.moreBtn}
                rounded
                onClick={onViewBrand}
              >
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
