import { Box, Grid, Hidden } from '@material-ui/core';
import {
  IProductCardProps,
  ProductCard,
} from 'modules/common/components/ProductCard';
import { t } from 'modules/i18n/utils/intl';
import { useIsMDUp } from 'modules/themes/useTheme';
import { FilledTab, FilledTabs } from 'modules/uiKit/FilledTabs';
import { Select } from 'modules/uiKit/Select';
import React, { useMemo } from 'react';
import { uid } from 'react-uid';
import { useTabItems } from './useTabItems';
import { useTabItemsStyles } from './useTabItemsStyles';

export type TabItemProps = Omit<IProductCardProps, 'ImgProps'> & {
  img: string;
};

interface ITabItemsProps {
  className?: string;
  items?: TabItemProps[];
}

export const TabItems = ({ className, items }: ITabItemsProps) => {
  const classes = useTabItemsStyles();
  const isMDUp = useIsMDUp();
  const {
    categories,
    catergory,
    onCategorySelectChange,
    onCategoryTabChange,
    onSortChange,
    sortBy,
    sortVariants,
  } = useTabItems();

  const renderedProducts = useMemo(
    () =>
      items?.map(cardProps => (
        <Grid item xs={12} sm={6} lg={4} xl={3} key={uid(cardProps)}>
          <ProductCard
            key={uid(cardProps)}
            title={cardProps.title}
            href={cardProps.href}
            status={cardProps.status}
            price={cardProps.price}
            copies={cardProps.copies}
            ImgProps={{
              src: cardProps.img,
              objectFit: 'scale-down',
              loading: 'lazy',
            }}
            ProfileInfoProps={cardProps.ProfileInfoProps}
          />
        </Grid>
      )),
    [items],
  );

  return (
    <>
      <Box mb={3}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={6} md>
            <Hidden mdDown>
              <FilledTabs
                value={catergory}
                onChange={onCategoryTabChange as any}
                textColor="secondary"
                variant="scrollable"
              >
                {categories.map(({ label, value }) => (
                  <FilledTab
                    className={classes.tab}
                    key={uid(label)}
                    label={label}
                    value={value}
                  />
                ))}
              </FilledTabs>
            </Hidden>

            <Hidden lgUp>
              <Select
                className={classes.select}
                value={catergory}
                onChange={onCategorySelectChange}
                options={categories}
              />
            </Hidden>
          </Grid>

          <Grid item xs={6} md="auto">
            <Select
              className={classes.select}
              value={sortBy}
              onChange={onSortChange}
              options={sortVariants}
              renderValue={
                isMDUp
                  ? (value: any) => {
                      const sortVariant = sortVariants.find(
                        variant => variant.value === value,
                      );
                      const label = sortVariant?.label.toLowerCase();

                      return t('products.sort-label', {
                        value: label,
                      });
                    }
                  : undefined
              }
            />
          </Grid>
        </Grid>
      </Box>

      {items && (
        <Grid container spacing={4}>
          {renderedProducts}
        </Grid>
      )}
    </>
  );
};
