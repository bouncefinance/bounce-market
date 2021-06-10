import { Box, Hidden } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { NoItems } from 'modules/common/components/NoItems';
import {
  ProductCard,
  ProductCardCategoryType,
} from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { t } from 'modules/i18n/utils/intl';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import { IQueryMyBids, queryMyBids } from 'modules/profile/actions/queryMyBids';
import { FilledTab, FilledTabs } from 'modules/uiKit/FilledTabs';
import { Select } from 'modules/uiKit/Select';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { uid } from 'react-uid';
import { useTabBidsStyles } from './useTabBidsStyles';

const categories = [
  {
    value: ItemsChannel.all,
    label: t('profile.bids-categories.all'),
  },
  {
    value: ItemsChannel.fineArts,
    label: t('profile.bids-categories.art'),
  },
  {
    value: ItemsChannel.sports,
    label: t('profile.bids-categories.sport'),
  },
  {
    value: ItemsChannel.comicbooks,
    label: t('profile.bids-categories.Comicbooks'),
  },
];

export const TabBids = () => {
  const classes = useTabBidsStyles();
  const dispatch = useDispatchRequest();
  const [catergory, setCategory] = useState<ItemsChannel>(ItemsChannel.all);

  const onCategoryTabChange = useCallback(
    (_e: ChangeEvent<{}>, newValue: ItemsChannel) => {
      setCategory(newValue);
    },
    [],
  );

  const onCategorySelectChange = useCallback(
    (event: ChangeEvent<{ value: unknown }>) => {
      setCategory(event.target.value as ItemsChannel);
    },
    [],
  );

  const bidsQuery = useQuery<IQueryMyBids | null>({
    type: queryMyBids.toString(),
  });

  useEffect(() => {
    dispatch(queryMyBids());
  }, [dispatch]);

  const isLoading = bidsQuery.loading;

  const items = useMemo(() => {
    if (!bidsQuery.data) {
      return [];
    }

    const allItems = [...bidsQuery.data.claimList, ...bidsQuery.data.soldList];
    const filteredItems =
      catergory === ItemsChannel.all
        ? allItems
        : allItems.filter(item => item.channel === catergory);

    return filteredItems;
  }, [bidsQuery.data, catergory]);

  const hasItems = !!items.length;

  const renderedCards = useMemo(() => {
    return items.map(item => (
      <ProductCard
        id={item.id}
        poolId={item.poolId}
        auctionType={item.poolType}
        key={uid(item)}
        isOnSale
        href={
          item.poolId && item.poolType
            ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
                item.poolId,
                item.poolType,
              )
            : ''
        }
        price={item.price}
        title={item.itemname}
        priceType="BNB"
        endDate={undefined}
        copies={item.supply}
        likes={undefined}
        MediaProps={{
          category: item.category as ProductCardCategoryType,
          src: item.fileurl,
          objectFit: 'contain',
          loading: 'lazy',
        }}
        ProfileInfoProps={{
          subTitle: 'Owner',
          title: `${item.owneraddress ?? ''}`,
          users: [
            {
              name: 'Owner name',
            },
          ],
        }}
      />
    ));
  }, [items]);

  return (
    <>
      <Box mb={5}>
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
      </Box>

      {isLoading || hasItems ? (
        <ProductCards isLoading={isLoading}>{renderedCards}</ProductCards>
      ) : (
        <NoItems
          href={MarketRoutesConfig.Market.generatePath()}
          descr={t('profile.no-items.descr')}
        />
      )}
    </>
  );
};
