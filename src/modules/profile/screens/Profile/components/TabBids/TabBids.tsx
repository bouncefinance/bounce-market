import { Box, Hidden } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { QueryLoadingCentered } from 'modules/common/components/QueryLoading/QueryLoading';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import { getRecords } from 'modules/profile/actions/getRecords';
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
    value: ItemsChannel.fineArts,
    label: 'Art',
  },
  {
    value: ItemsChannel.sports,
    label: 'Sport',
  },
  {
    value: ItemsChannel.comics,
    label: 'Comics',
  },
];

interface ITabBidsProps {
  className?: string;
}

export const TabBids = ({ className }: ITabBidsProps) => {
  const classes = useTabBidsStyles();
  const dispatch = useDispatchRequest();
  const [catergory, setCategory] = useState<ItemsChannel>(
    ItemsChannel.fineArts,
  );

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

  const recordsQuery = useQuery({ type: getRecords.toString() });
  const bidsQuery = useQuery<IQueryMyBids | null>({
    type: queryMyBids.toString(),
  });

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

  useEffect(() => {
    if (!recordsQuery.data) {
      return;
    }
    dispatch(
      queryMyBids({
        channel: catergory,
      }),
    );
  }, [catergory, dispatch, recordsQuery.data]);

  const isLoading = recordsQuery.loading || bidsQuery.loading;

  const items = useMemo(() => {
    if (!bidsQuery.data) {
      return [];
    }
    return [...bidsQuery.data.claimList, ...bidsQuery.data.soldList];
  }, [bidsQuery.data]);

  const hasItems = !!items.length;

  const renderedCards = useMemo(() => {
    return items.map(item => (
      <ProductCard
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
          category: item.category,
          src: item.fileurl,
          objectFit: 'contain',
          loading: 'lazy',
        }}
        ProfileInfoProps={{
          subTitle: 'Owner',
          title: 'Owner title',
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

      {isLoading && <QueryLoadingCentered />}
      {!isLoading && hasItems && <ProductCards>{renderedCards}</ProductCards>}
      {!isLoading && !hasItems && (
        <NoItems href={MarketRoutesConfig.Market.generatePath()} />
      )}
    </>
  );
};
