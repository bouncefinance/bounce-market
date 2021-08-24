import { useQuery } from '@redux-requests/react';
import { IPoolNftItem } from 'modules/api/common/poolType';
import { fetchOverview } from 'modules/overview/actions/fetchOverview';
import { PROMO_ITEMS_COUNT } from 'modules/overview/const';
import { ISectionProps } from 'modules/uiKit/Section';
import { useMemo } from 'react';
import { uid } from 'react-uid';
import { MoversComponent } from './MoversComponent';
import { MarketNftCard } from 'modules/market/components/Products/nftCard';

export const Movers = (sectionProps: ISectionProps) => {
  const overviewQuery = useQuery<IPoolNftItem[] | null>({
    type: fetchOverview.toString(),
  });

  const slicedItems = useMemo(
    () =>
      overviewQuery.data
        ? overviewQuery.data.slice(PROMO_ITEMS_COUNT, overviewQuery.data.length)
        : [],
    [overviewQuery.data],
  );

  const renderedItems = slicedItems.map(item => {
    return (
      <MarketNftCard
        item={item}
        key={uid(item)}
        tokenSymbol={(overviewQuery?.data as any)?.tokenSymbol ?? ''}
      />
    );
  });

  return (
    <MoversComponent
      {...sectionProps}
      isLoading={overviewQuery.loading}
      itemCount={overviewQuery.data ? overviewQuery.data.length : 0}
    >
      {renderedItems}
    </MoversComponent>
  );
};
