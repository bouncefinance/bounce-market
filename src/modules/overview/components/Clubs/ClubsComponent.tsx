import { Box, Container, Grid, Typography, useTheme } from '@material-ui/core';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useEffect, useMemo, useState } from 'react';
import { uid } from 'react-uid';
import SwiperCore, { Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ClubsItem, IClubsItemProps } from './ClubsItem';
import { useClubsStyles } from './useClubsStyles';

SwiperCore.use([Lazy]);

export type IClubsItem = Omit<IClubsItemProps, 'ImgProps'> & {
  img: string;
};

interface IClubsProps extends ISectionProps {
  className?: string;
  items: IClubsItem[];
}

export const ClubsComponent = ({
  className,
  items,
  ...sectionProps
}: IClubsProps) => {
  const classes = useClubsStyles();
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
      items.map(({ img, href, name }, i) => (
        <SwiperSlide className={classes.slide} key={uid(name, i)}>
          <ClubsItem
            href={href}
            name={name}
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
              <Typography variant="h2">Top clubs</Typography>
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
