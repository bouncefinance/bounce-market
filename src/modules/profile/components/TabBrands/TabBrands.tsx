import { Grid } from '@material-ui/core';
import { BrandCard, IBrandCardProps, } from 'modules/common/components/BrandCard';
import React, { useMemo } from 'react';
import { uid } from 'react-uid';
import { BrandEmptyCard } from '../../../common/components/BrandEmptyCard';
import classNames from 'classnames';
import { useTabBrandStyles } from './useTabBrandsStyles';

export type TabBrandProps = Omit<IBrandCardProps, 'ImgProps'> & {
  img: string;
};

interface ITabBrandsProps {
  className?: string;
  items?: TabBrandProps[];
}

export const TabBrands = ({ className, items }: ITabBrandsProps) => {
  const classes = useTabBrandStyles();

  const renderedBrands = useMemo(
    () =>
      items?.map(brandProps => (
        <Grid item xs={12} sm={6} lg={4} xl={3} key={uid(brandProps)}>
          <BrandCard
            key={uid(brandProps)}
            title={brandProps.title}
            href={brandProps.href}
            itemsCount={brandProps.itemsCount}
            ImgProps={{
              src: brandProps.img,
              objectFit: 'scale-down',
              loading: 'lazy',
            }}
          />
        </Grid>
      )),
    [items],
  );

  const renderEmpty = (
    <Grid item xs={12} sm={6} lg={4} xl={3}>
      <BrandEmptyCard/>
    </Grid>
  );

  return (
    <>
      {items && (
        <Grid container spacing={4} className={classNames(classes.root, className)}>
          {renderedBrands}
          {renderEmpty}
        </Grid>
      )}
    </>
  );
};
