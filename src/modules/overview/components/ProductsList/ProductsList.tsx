import { Fade, Grid } from '@material-ui/core';
import {
  IProductCardProps,
  ProductCard,
} from 'modules/common/components/ProductCard';
import React, { useMemo } from 'react';
import InView from 'react-intersection-observer';
import { uid } from 'react-uid';

type IImgProps = Omit<IProductCardProps, 'MediaProps'> & {
  img: string;
};

type IVideoProps = Omit<IProductCardProps, 'MediaProps'> & {
  video: string;
};

export type ProductProps = IImgProps | IVideoProps;

interface IProductsListProps {
  items: ProductProps[];
}

export const ProductsList = ({ items }: IProductsListProps) => {
  const renderedProducts = useMemo(
    () =>
      items.map(cardProps => (
        <InView key={uid(cardProps)} rootMargin="-10% 0% -10% 0%">
          {({ inView, ref }) => (
            <Fade in={inView}>
              <Grid item xs={12} sm={6} lg={4} xl={3} ref={ref}>
                <ProductCard
                  key={uid(cardProps)}
                  title={cardProps.title}
                  price={cardProps.price}
                  priceType={cardProps.priceType}
                  endDate={cardProps.endDate}
                  likes={cardProps.likes}
                  href={cardProps.href}
                  MediaProps={
                    (cardProps as IImgProps).img
                      ? {
                          src: (cardProps as IImgProps).img,
                          objectFit: 'scale-down',
                          loading: 'lazy',
                          category: 'image',
                        }
                      : {
                          src: (cardProps as IVideoProps).video,
                          category: 'video',
                        }
                  }
                  ProfileInfoProps={cardProps.ProfileInfoProps}
                />
              </Grid>
            </Fade>
          )}
        </InView>
      )),
    [items],
  );

  return (
    <Grid container spacing={4}>
      {renderedProducts}
    </Grid>
  );
};
