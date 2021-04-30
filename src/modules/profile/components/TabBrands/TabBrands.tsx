import { Grid } from '@material-ui/core';
import { BrandCard, IBrandCardProps, } from 'modules/profile/components/BrandCard';
import React, { useMemo } from 'react';
import { uid } from 'react-uid';
import { BrandEmptyCard } from '../BrandEmptyCard';
import classNames from 'classnames';
import { useTabBrandStyles } from './useTabBrandsStyles';

interface ITabBrandsProps {
  className?: string;
  items?: IBrandCardProps[];
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
            imgSrc={brandProps.imgSrc}
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
