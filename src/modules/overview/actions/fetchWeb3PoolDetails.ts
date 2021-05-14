import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from '../../../store/store';
import { AuctionType } from '../api/auctionType';
import { setAccount } from '../../account/store/actions/setAccount';
import {
  BounceEnglishAuctionNFT,
  BounceFixedSwapNFT,
} from '../../web3/contracts';
import {
  getEnglishAuctionContract,
  getFixedSwapContract,
} from '../../createNFT/actions/publishNft';
import { IFetchPoolDetailsData } from './fetchPoolDetails';
import BigNumber from 'bignumber.js';
import { AuctionState } from './fetchPools';

interface IFetchPoolDetailsByIdParams {
  poolId: number;
  poolType: AuctionType;
}

export const fetchWeb3PoolDetails = createSmartAction<
  RequestAction<IFetchPoolDetailsData, IFetchPoolDetailsData>
>(
  'fetchWeb3PoolDetails',
  ({ poolId, poolType }: IFetchPoolDetailsByIdParams) => {
    return {
      request: {
        promise: (async function () {})(),
      },
      meta: {
        onRequest: (
          request: { promise: Promise<any> },
          action: RequestAction,
          store: Store<RootState> & { dispatchRequest: DispatchRequest },
        ) => {
          return {
            promise: (async function () {
              const {
                data: { chainId, address, web3 },
              } = getQuery(store.getState(), {
                type: setAccount.toString(),
                action: setAccount,
              });

              if (poolType === AuctionType.FixedSwap) {
                const BounceFixedSwapNFT_CT = new web3.eth.Contract(
                  BounceFixedSwapNFT,
                  getFixedSwapContract(chainId),
                );

                const pools = await BounceFixedSwapNFT_CT.methods
                  .pools(poolId)
                  .call();

                const swappedAmount0Pool = await BounceFixedSwapNFT_CT.methods
                  .swappedAmount0P(poolId)
                  .call();
                const creatorCanceledPool = await BounceFixedSwapNFT_CT.methods
                  .creatorCanceledP(poolId)
                  .call();

                debugger;
                return {
                  quantity: parseInt(pools.amountTotal0),
                  totalPrice: new BigNumber(0),
                  createTime: new Date(),
                  creator: pools.creator,
                  name: pools.name,
                  nftType: parseInt(pools.nftType),
                  poolId,
                  price: new BigNumber(
                    web3.utils.fromWei(pools.amountTotal1),
                  ).dividedBy(pools.amountTotal0),
                  state: (() => {
                    if (
                      parseInt(swappedAmount0Pool) <
                      parseInt(pools.amountTotal0)
                    ) {
                      return AuctionState.Live;
                    } else if (
                      parseInt(swappedAmount0Pool) ===
                      parseInt(pools.amountTotal0)
                    ) {
                      return AuctionState.Filled;
                    } else if (creatorCanceledPool) {
                      return AuctionState.Canceled;
                    } else {
                      return AuctionState.Closed;
                    }
                  })(),
                  tokenContract: pools.token0,
                  unitContract: pools.token1,
                  tokenId: parseInt(pools.tokenId),
                  swappedAmount0Pool: new BigNumber(swappedAmount0Pool),
                } as IFetchPoolDetailsData;
              } else {
                const BounceEnglishAuctionNFT_CT = new web3.eth.Contract(
                  BounceEnglishAuctionNFT,
                  getEnglishAuctionContract(chainId),
                );
                const pools = await BounceEnglishAuctionNFT_CT.methods
                  .pools(poolId)
                  .call();
                const currentBidderAmount = await BounceEnglishAuctionNFT_CT.methods
                  .currentBidderAmount1P(poolId)
                  .call();
                const bidCountPool = await BounceEnglishAuctionNFT_CT.methods
                  .bidCountP(poolId)
                  .call();
                const myClaimedPool = await BounceEnglishAuctionNFT_CT.methods
                  .myClaimedP(address, poolId)
                  .call();
                const creatorClaimedPool = await BounceEnglishAuctionNFT_CT.methods
                  .creatorClaimedP(poolId)
                  .call();
                const reserveAmount1Pool = await BounceEnglishAuctionNFT_CT.methods
                  .reserveAmount1P(poolId)
                  .call();
                const currentBidderPool = await BounceEnglishAuctionNFT_CT.methods
                  .currentBidderP(poolId)
                  .call();
                let showPrice = pools.amountMin1;

                if (currentBidderAmount !== '0') {
                  showPrice = currentBidderAmount;
                }

                const curTime = new Date().getTime() / 1000;
                const diffTime = parseInt(pools.closeAt) - curTime;

                return {
                  amountMax1: new BigNumber(pools.amountMax1),
                  amountMin1: new BigNumber(pools.amountMin1),
                  amountMinIncr1: new BigNumber(pools.amountMinIncr1),
                  bidderClaimed: true, // TODO
                  closeAt: new Date(pools.closeAt),
                  createTime: new Date(), // TODO
                  creator: pools.creator,
                  creatorClaimed: true, // TODO
                  duration: pools.duration,
                  lastestBidAmount: new BigNumber(0),
                  name: pools.name,
                  nftType: parseInt(pools.nftType),
                  poolId,
                  state: (() => {
                    if (diffTime < 0) {
                      if (
                        new BigNumber(currentBidderAmount)
                          .dividedBy(reserveAmount1Pool)
                          .isGreaterThanOrEqualTo(1) ||
                        new BigNumber(currentBidderAmount)
                          .dividedBy(pools.amountMax1)
                          .isGreaterThanOrEqualTo(1)
                      ) {
                        return AuctionState.Closed;
                      } else if (
                        new BigNumber(currentBidderAmount)
                          .dividedBy(reserveAmount1Pool)
                          .isLessThan(1)
                      ) {
                        return AuctionState.Failed;
                      } else {
                        return AuctionState.Closed;
                      }
                    } else {
                      return AuctionState.Live;
                    }
                  })(),
                  tokenContract: pools.token0,
                  unitContract: pools.token1,
                  tokenAmount0: pools.tokenAmount0,
                  tokenId: parseInt(pools.tokenId),

                  bidCountPool,
                  myClaimedPool,
                  currentBidderPool,
                  creatorClaimedPool,
                  reserveAmount1Pool,
                  showPrice,
                } as IFetchPoolDetailsData;
              }
            })(),
          };
        },
        asQuery: true,
      },
    };
  },
);
