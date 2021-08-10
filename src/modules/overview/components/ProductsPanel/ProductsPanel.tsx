import { Grid, Hidden } from '@material-ui/core';
import classNames from 'classnames';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import { useIsMDUp } from 'modules/themes/useTheme';
import { FilledTab, FilledTabs } from 'modules/uiKit/FilledTabs';
import { Select } from 'modules/uiKit/Select';
import React, { ChangeEvent, useCallback } from 'react';
import { uid } from 'react-uid';
import { useProductsPanelStyles } from './useProductsPanelStyles';

const categories = [
  {
    value: ItemsChannel.all,
    label: t('product-panel.all'),
  },
  {
    value: ItemsChannel.fineArts,
    label: t('product-panel.art'),
  },
  {
    value: ItemsChannel.sports,
    label: t('product-panel.sports'),
  },
  {
    value: ItemsChannel.comics,
    label: t('product-panel.Comics'),
  },
];

const sortVariants = [
  {
    value: '1',
    label: 'On auction',
  },
  {
    value: '2',
    label: 'Recently added',
  },
  {
    value: '3',
    label: 'Cheapest',
  },
  {
    value: '4',
    label: 'Highest price',
  },
  {
    value: '5',
    label: 'Most liked',
  },
];

interface IProductsPanelProps {
  className?: string;
  catergory: string;
  sortBy: string;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  disabled?: boolean;
}

export const ProductsPanel = ({
  className,
  catergory,
  sortBy,
  onCategoryChange,
  onSortChange,
  disabled = false,
}: IProductsPanelProps) => {
  const classes = useProductsPanelStyles();
  const isMDUp = useIsMDUp();

  const onCategorySelectChange = useCallback(
    (event: ChangeEvent<{ value: unknown }>) => {
      onCategoryChange(event.target.value as string);
    },
    [onCategoryChange],
  );

  const onCategoryTabChange = useCallback(
    (_e: ChangeEvent<{}>, newValue: ItemsChannel) => {
      onCategoryChange(newValue);
    },
    [onCategoryChange],
  );

  const sortChangeHandler = useCallback(
    (event: ChangeEvent<{ value: unknown }>) => {
      onSortChange(event.target.value as string);
    },
    [onSortChange],
  );

  return (
    <div className={classNames(className, classes.root)}>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={6} lg>
          <Hidden mdDown>
            <FilledTabs
              value={catergory}
              onChange={onCategoryTabChange as any}
              textColor="secondary"
              variant="scrollable"
              disabled={disabled}
            >
              {categories.map(({ label, value }) => (
                <FilledTab
                  className={classes.tab}
                  key={uid(label)}
                  label={label}
                  value={value}
                  disabled={disabled}
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
              disabled={disabled}
            />
          </Hidden>
        </Grid>

        {featuresConfig.nftItemsSortSelect && (
          <Grid item xs={6} md="auto">
            <Select
              className={classes.select}
              value={sortBy}
              onChange={sortChangeHandler}
              options={sortVariants}
              disabled={disabled}
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
        )}
      </Grid>
    </div>
  );
};
