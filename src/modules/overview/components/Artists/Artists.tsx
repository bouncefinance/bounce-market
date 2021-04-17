import { Box, Container, Grid, Typography, useTheme } from '@material-ui/core';
import { SwiperPreloader } from 'modules/components/SwiperPreloader';
import { Button } from 'modules/uiKit/Button';
import { Section } from 'modules/uiKit/Section';
import { uid } from 'react-uid';
import SwiperCore, { Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArtistsItem, IArtistsItemProps } from '../ArtistsItem';
import { useArtistsStyles } from './ArtistsStyles';

SwiperCore.use([Lazy]);

type ItemProps = Omit<IArtistsItemProps, 'ImgProps'> & {
  img: string;
};

interface IArtistsProps {
  className?: string;
}

export const ArtistsComponent = ({ className }: IArtistsProps) => {
  const classes = useArtistsStyles();
  const theme = useTheme();

  const sliderProps: Swiper = {
    watchSlidesVisibility: true,
    slidesPerView: 'auto',
    spaceBetween: theme.spacing(2),
    lazy: true,
    breakpoints: {
      [theme.breakpoints.values.md]: {
        spaceBetween: theme.spacing(8),
      },
    },
  };

  const items: ItemProps[] = new Array(8).fill(0).map((_, i) => ({
    img: `https://picsum.photos/134?random=${i + 1}`,
    href: '#',
    name: `Artist ${i + 1}`,
    subscribers: 10 + i,
  }));

  const renderedSlides = items.map(({ img, href, name, subscribers }, i) => (
    <SwiperSlide className={classes.slide} key={uid(name, i)}>
      <ArtistsItem
        href={href}
        name={name}
        subscribers={subscribers}
        ImgProps={{
          src: img,
          isNativeLazyLoading: false,
          imgClassName: 'swiper-lazy',
        }}
        imgPreloader={<SwiperPreloader />}
      />
    </SwiperSlide>
  ));

  return (
    <Section className={classes.root} stackUp>
      <Container>
        <Box mb={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
              <Typography variant="h2">Top Artists</Typography>
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

export const Artists = () => {
  return <ArtistsComponent />;
};
