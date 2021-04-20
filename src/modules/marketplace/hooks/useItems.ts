import { useQuery } from '@redux-requests/react';
import { MarketplaceActions } from '../marketplaceActions';
import { AuctionState, ITradeItem } from '../api/getPools';
import Icon1 from './assets/1.png';
import Icon2 from './assets/2.png';
import Icon3 from './assets/3.png';
import Icon4 from './assets/4.png';
import Icon5 from './assets/5.png';
import Icon6 from './assets/6.png';
import Icon7 from './assets/7.png';
import Icon8 from './assets/8.png';
import Icon9 from './assets/9.png';
import Icon10 from './assets/10.png';
import Icon11 from './assets/11.png';
import Icon12 from './assets/12.png';
import Icon13 from './assets/13.png';
import Icon14 from './assets/14.png';
import Icon15 from './assets/15.png';
import Icon16 from './assets/16.png';
import Icon17 from './assets/17.png';
import Icon18 from './assets/18.jpeg';

const mock = [
  {
    fileurl: Icon1,
    itemname: 'Matthijs de Ligt',
  },
  {
    fileurl: Icon2,
    itemname: 'Lee Kang-in',
  },
  {
    fileurl: Icon3,
    itemname: 'Andriy Lunin',
  },
  {
    fileurl: Icon4,
    itemname: 'Donyell Malen',
  },
  {
    fileurl: Icon5,
    itemname: 'Gianluigi Donnarumma',
  },
  {
    fileurl: Icon6,
    itemname: 'Phil Foden',
  },
  {
    fileurl: Icon7,
    itemname: 'Matteo Guendouzi',
  },
  {
    fileurl: Icon8,
    itemname: 'Erling Braut Haland',
  },
  {
    fileurl: Icon9,
    itemname: 'Gianluigi Donnarumma',
  },
  {
    fileurl: Icon10,
    itemname: 'Phil Foden',
  },
  {
    fileurl: Icon11,
    itemname: 'Matteo Guendouzi',
  },
  {
    fileurl: Icon12,
    itemname: 'Erling Braut Haland',
  },
  {
    fileurl: Icon13,
    itemname: 'Kai Havertz',
  },
  {
    fileurl: Icon14,
    itemname: 'Joao Felix',
  },
  {
    fileurl: Icon15,
    itemname: 'Dejan Joveljic',
  },
  {
    fileurl: Icon16,
    itemname: 'Moise Kean',
  },
  {
    fileurl: Icon17,
    itemname: 'Alphonso Davies',
  },
  {
    fileurl: Icon18,
    itemname: 'Viatlii Mutko',
  },
];

export function useItems() {
  const {
    data: dataPools,
    loading: loadingPools,
    pristine: pristinePools,
  } = useQuery({
    type: MarketplaceActions.fetchPools.toString(),
    action: MarketplaceActions.fetchPools,
  });
  const {
    data: dataItems,
    loading: loadingItems,
    pristine: pristineItems,
  } = useQuery({
    type: MarketplaceActions.fetchItems.toString(),
    action: MarketplaceActions.fetchItems,
  });

  const pristine = pristinePools || pristineItems;
  const loading = loadingPools || loadingItems || pristine;

  if (!dataPools || !dataItems) {
    return { data: null, loading };
  }

  const tradePools: ITradeItem[] = dataPools.tradePools.filter(
    item => item.state !== AuctionState.Done,
  );

  // TODO Remove zero pull filtering
  const tradeAuctions: ITradeItem[] = dataPools.tradeAuctions.filter(
    item => item.state !== AuctionState.Done && item.poolId !== 0,
  );

  const pools = [...tradePools, ...tradeAuctions];

  return {
    data: dataItems
      .filter(poolInfo => !!pools.find(pool => poolInfo.id === pool.tokenId))
      .map((poolInfo, index) => {
        const pool = pools.find(pool => poolInfo.id === pool.tokenId)!;

        const mockItem = mock[index];

        return {
          ...poolInfo,
          poolType: pool.poolType,
          poolId: pool.poolId,
          price: pool.price,
          createTime: pool.createTime,
          token1: pool.token1,
          ...mockItem,
        };
      }),
    loading,
  };
}
