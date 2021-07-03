import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { AuctionType } from 'modules/overview/api/auctionType';
import { queryItemByFilter } from 'modules/pools/actions/queryItemByFilter';
import { queryPools } from 'modules/pools/actions/queryPools';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { compare } from '../api/queryBrand';
import { QueryBrandPoolsAction } from './const';

export interface IQueryBrandPoolsArgs {
  owneraddress: string;
  contractaddress: string;
}

interface ITempToken {
  tokenId: number;
  auctionType: AuctionType;
  poolId: number;
}

export const queryBrandPools = createSmartAction<RequestAction>(
  QueryBrandPoolsAction,
  (params: IQueryBrandPoolsArgs) => ({
    request: {
      promise: (async function () {})(),
    },
    meta: {
      asMutation: true,
      onRequest: (
        request: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async () => {
            const { data: poolData } = await store.dispatchRequest(
              queryPools(params.owneraddress),
            );

            const fsPools = (poolData?.tradePools ?? []).filter(
              item =>
                item.state !== 1 &&
                compare(item.token0, params.contractaddress),
            );
            const eaPools = (poolData?.tradeAuctions ?? []).filter(
              item =>
                item.state !== 1 &&
                compare(item.token0, params.contractaddress),
            );

            const fsToken: ITempToken[] = fsPools.map(item => {
              return {
                tokenId: item.tokenId,
                auctionType: AuctionType.FixedSwap,
                poolId: item.poolId,
              };
            });
            const eaToken: ITempToken[] = eaPools.map(item => {
              return {
                tokenId: item.tokenId,
                auctionType: AuctionType.EnglishAuction,
                poolId: item.poolId,
              };
            });

            const allToken: ITempToken[] = fsToken.concat(eaToken);

            const querytarTokenList = async (tarTokenList: ITempToken[]) => {
              const { data: itemData } = await store.dispatchRequest(
                queryItemByFilter({
                  accountaddress: '',
                  category: '',
                  channel: '',
                  cts: new Array(tarTokenList.length).fill(
                    params.contractaddress,
                  ),
                  ids: tarTokenList.map(item => item.tokenId),
                }),
              );

              const mapTarTokenList = new Map();
              tarTokenList.forEach(item =>
                mapTarTokenList.set(item.tokenId, item),
              );

              return (itemData ?? []).map(item => {
                const findTar = mapTarTokenList.get(item.id);
                return findTar
                  ? {
                      ...findTar,
                      ...item,
                      href:
                        findTar.poolId && findTar.auctionType
                          ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
                              findTar.poolId,
                              findTar.auctionType,
                            )
                          : '',
                    }
                  : {};
              });
            };

            if (allToken.length === 0) {
              return new Promise((resolve, reject) => resolve([]));
            }

            const PromiseList = [];

            if (fsToken.length > 0) {
              const queryFsList = querytarTokenList(fsToken);
              PromiseList.push(queryFsList);
            }

            if (eaToken.length > 0) {
              const queryEaList = querytarTokenList(eaToken);
              PromiseList.push(queryEaList);
            }

            return Promise.all(PromiseList).then(res => res.flat());
          })(),
        };
      },
    },
  }),
);
