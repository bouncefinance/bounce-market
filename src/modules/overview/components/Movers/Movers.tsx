import {
  Box,
  ButtonBase,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { getRandomId } from 'modules/common/utils/getRandomId';
import { AngleLeftIcon } from 'modules/components/Icons/AngleLeftIcon';
import { AngleRightIcon } from 'modules/components/Icons/AngleRightIcon';
import { IProductCardProps, ProductCard } from 'modules/components/ProductCard';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import React from 'react';
import { uid } from 'react-uid';
import SwiperCore, { Lazy, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMoversStyles } from './MoversStyles';

SwiperCore.use([Lazy, Navigation]);
const prevId = getRandomId('prev');
const nextId = getRandomId('next');

type ProductProps = Omit<IProductCardProps, 'ImgProps'> & {
  img: string;
};

interface IMoversProps extends ISectionProps {
  items: ProductProps[];
}

export const MoversComponent = ({
  className,
  items,
  ...sectionProps
}: IMoversProps) => {
  const classes = useMoversStyles();

  const sliderProps: Swiper = {
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    spaceBetween: 30,
    lazy: true,
    navigation: {
      prevEl: `#${prevId}`,
      nextEl: `#${nextId}`,
    },
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
      />
    </SwiperSlide>
  ));

  return (
    <Section {...sectionProps} className={classNames(classes.root, className)}>
      <Container>
        <Box mb={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
              <Typography variant="h2">Fast movers</Typography>
            </Grid>

            <Grid item xs="auto">
              <div className={classes.buttons}>
                <ButtonBase id={prevId} className={classes.navBtn}>
                  <AngleLeftIcon className={classes.navBtnIcon} />
                </ButtonBase>

                <ButtonBase id={nextId} className={classes.navBtn}>
                  <AngleRightIcon className={classes.navBtnIcon} />
                </ButtonBase>
              </div>
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

export const Movers = () => {
  const items: ProductProps[] = [
    {
      title: 'Pokemon Indigo League Baвфывыфв фывфыв',
      price: new BigNumber(10000),
      priceType: 'USDT',
      endDate: new Date(2021, 3, 16),
      likes: 102,
      href: '#',
      img: 'https://picsum.photos/seed/3/240',
      ProfileInfoProps: {
        subTitle: 'Owner',
        title: '1livinginzen',
        users: [
          {
            name: 'name',
            avatar: 'https://picsum.photos/32/32?random=1',
            verified: true,
          },
          {
            name: 'name',
            avatar: 'https://picsum.photos/32/32?random=2',
            verified: true,
          },
        ],
      },
    },
    {
      title: 'Pokemon Indigo League Ba',
      price: new BigNumber(10000),
      priceType: 'USDT',
      endDate: new Date(2021, 3, 18),
      likes: 100,
      href: '#',
      img: 'https://picsum.photos/seed/1/240',
      ProfileInfoProps: {
        subTitle: 'Owner',
        title: '1livinginzen',
        users: [
          {
            name: 'name',
            avatar: 'https://via.placeholder.com/32',
          },
        ],
      },
    },
  ];

  return <MoversComponent stackUp stackDown items={items} />;
};
