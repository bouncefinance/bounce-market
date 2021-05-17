import { Box, Grid, Hidden } from '@material-ui/core';
import { IProductCardProps } from 'modules/common/components/ProductCard';
import { t } from 'modules/i18n/utils/intl';
import { useIsMDUp } from 'modules/themes/useTheme';
import { FilledTab, FilledTabs } from 'modules/uiKit/FilledTabs';
import { Select } from 'modules/uiKit/Select';
import React, { ReactNode } from 'react';
import { uid } from 'react-uid';
import { useTabItems } from './useTabItems';
import { useTabItemsStyles } from './useTabItemsStyles';

export type TabItemProps = Omit<IProductCardProps, 'MediaProps'> & {
  img: string;
};

interface ITabItemsProps {
  children: ReactNode;
}

export const TabItems = ({ children }: ITabItemsProps) => {
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

      {children}
    </>
  );
};
