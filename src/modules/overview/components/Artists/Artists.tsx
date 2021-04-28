import { Box, Container, Grid, Typography, useTheme } from '@material-ui/core';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useEffect, useMemo, useState } from 'react';
import { uid } from 'react-uid';
import SwiperCore, { Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArtistsItem, IArtistsItemProps } from '../ArtistsItem';
import { useArtistsStyles } from './ArtistsStyles';

SwiperCore.use([Lazy]);

type ItemProps = Omit<IArtistsItemProps, 'ImgProps'> & {
  img: string;
};

interface IArtistsProps extends ISectionProps {
  className?: string;
  items: ItemProps[];
}

export const ArtistsComponent = ({
  className,
  items,
  ...sectionProps
}: IArtistsProps) => {
  const classes = useArtistsStyles();
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
    spaceBetween: theme.spacing(2),
    lazy: true,
    breakpoints: {
      [theme.breakpoints.values.md]: {
        spaceBetween: theme.spacing(8),
      },
    },
    onSwiper: setSwiper,
  };

  const renderedSlides = useMemo(
    () =>
      items.map(({ img, href, name, subscribers }, i) => (
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
      )),
    [classes.slide, items],
  );

  return (
    <Section {...sectionProps} className={classes.root}>
      <Container>
        <Box mb={5}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
              <Typography variant="h2">{t('artists.title')}</Typography>
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
      </Container>
    </Section>
  );
};

export const Artists = () => {
  const artists: ItemProps[] = new Array(8).fill(0).map((_, i) => ({
    img: `https://picsum.photos/134?random=${i + 1}`,
    href: '#',
    name: `Artist ${i + 1}`,
    subscribers: 10 + i,
  }));

  return <ArtistsComponent items={artists} stackUp stackDown />;
};
