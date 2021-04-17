import { Box, Container, Grid, Typography, useTheme } from '@material-ui/core';
import classNames from 'classnames';
import { Button } from 'modules/uiKit/Button';
import { Img } from 'modules/uiKit/Img';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useMemo } from 'react';
import { uid } from 'react-uid';
import SwiperCore, { Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
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
      <Container>
        <Box mb={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
              <Typography variant="h2">Hot Brands</Typography>
            </Grid>

            <Grid item xs="auto">
              <Button variant="outlined" className={classes.moreBtn}>
                View all
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

export const Brands = () => {
  const brands: IBrandItemProps[] = new Array(6).fill(0).map((_, i) => ({
    img: `https://picsum.photos/134?random=${i + 1}`,
    theme: i === 1 || i === 4 ? 'dark' : 'light',
  }));

  return <BrandsComponent items={brands} stackUp />;
};
