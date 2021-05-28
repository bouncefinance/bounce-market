import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from 'store';
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
import {
  IEnglishAuctionDetails,
  IFixedAuctionDetails,
} from './fetchPoolDetails';
import BigNumber from 'bignumber.js';
import { fetchCurrency } from './fetchCurrency';
import { throwIfDataIsEmptyOrError } from '../../common/utils/throwIfDataIsEmptyOrError';
import { fromWei } from '../../common/utils/fromWei';
import { AuctionState } from '../../common/const/AuctionState';
import { FixedSwapState } from '../../common/const/FixedSwapState';

export type AuctionRole = 'owner' | 'buyer' | 'others';

interface IWeb3FixedAuctionDetails extends IFixedAuctionDetails {}
interface IWeb3EnglishAuctionDetails extends IEnglishAuctionDetails {
  role: AuctionRole;
}

export type IFetchWeb3PoolDetailsData =
  | IWeb3FixedAuctionDetails
  | IWeb3EnglishAuctionDetails;

interface IFetchPoolDetailsByIdParams {
  poolId: number;
  poolType: AuctionType;
}

export const fetchWeb3PoolDetails = createSmartAction<
  RequestAction<IFetchWeb3PoolDetailsData, IFetchWeb3PoolDetailsData>
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

                const {
                  data: { decimals },
                } = throwIfDataIsEmptyOrError(
                  await store.dispatchRequest(
                    fetchCurrency(
                      { unitContract: pools.token1 },
                      { silent: true },
                    ),
                  ),
                );

                return {
                  quantity: parseInt(pools.amountTotal0),
                  // TODO: Apply precision
                  totalPrice: new BigNumber(
                    web3.utils.fromWei(pools.amountTotal1),
                  ),
                  createTime: new Date(),
                  creator: pools.creator,
                  name: pools.name,
                  nftType: parseInt(pools.nftType),
                  poolId,
                  price: new BigNumber(
                    fromWei(pools.amountTotal1, decimals),
                  ).dividedBy(pools.amountTotal0),
                  state: (() => {
                    if (
                      parseInt(swappedAmount0Pool) <
                      parseInt(pools.amountTotal0)
                    ) {
                      return FixedSwapState.Live;
                    } else if (
                      parseInt(swappedAmount0Pool) ===
                      parseInt(pools.amountTotal0)
                    ) {
                      return FixedSwapState.Completed;
                    } else if (creatorCanceledPool) {
                      return FixedSwapState.Canceled;
                    } else {
                      return FixedSwapState.Claimed;
                    }
                  })(),
                  tokenContract: pools.token0,
                  unitContract: pools.token1,
                  tokenId: parseInt(pools.tokenId),
                  swappedAmount0Pool: new BigNumber(swappedAmount0Pool),
                } as IFetchWeb3PoolDetailsData;
              } else {
                const BounceEnglishAuctionNFT_CT = new web3.eth.Contract(
                  BounceEnglishAuctionNFT,
                  getEnglishAuctionContract(chainId),
                );
                const pool = await BounceEnglishAuctionNFT_CT.methods
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
                const reserveAmount = await BounceEnglishAuctionNFT_CT.methods
                  .reserveAmount1P(poolId)
                  .call();
                const lastBidderAddress = await BounceEnglishAuctionNFT_CT.methods
                  .currentBidderP(poolId)
                  .call();
                let showPrice = pool.amountMin1;

                if (currentBidderAmount !== '0') {
                  showPrice = currentBidderAmount;
                }

                const curTime = new Date().getTime() / 1000;
                const diffTime = parseInt(pool.closeAt) - curTime;

                const {
                  data: { decimals },
                } = throwIfDataIsEmptyOrError(
                  await store.dispatchRequest(
                    fetchCurrency(
                      { unitContract: pool.token1 },
                      { silent: true },
                    ),
                  ),
                );

                const amountMin1 = new BigNumber(
                  fromWei(pool.amountMin1, decimals),
                );

                return {
                  amountMax1: new BigNumber(fromWei(pool.amountMax1, decimals)),
                  amountMin1,
                  amountMinIncr1: new BigNumber(
                    fromWei(pool.amountMinIncr1, decimals),
                  ),
                  bidderClaimed: true, // TODO
                  closeAt: new Date(parseInt(pool.closeAt) * 1000),
                  createTime: new Date(), // TODO
                  creator: pool.creator,
                  creatorClaimed: true, // TODO
                  duration: pool.duration,
                  lastestBidAmount:
                    currentBidderAmount !== '0'
                      ? new BigNumber(fromWei(currentBidderAmount, decimals))
                      : amountMin1,
                  name: pool.name,
                  nftType: parseInt(pool.nftType),
                  poolId,
                  state: (() => {
                    if (
                      new BigNumber(currentBidderAmount).isGreaterThanOrEqualTo(
                        pool.amountMax1,
                      )
                    ) {
                      return AuctionState.CompletedByDirectPurchase;
                    }

                    if (
                      diffTime < 0 &&
                      new BigNumber(currentBidderAmount).isGreaterThanOrEqualTo(
                        reserveAmount,
                      )
                    ) {
                      return AuctionState.CompletedByTime;
                    }

                    if (
                      diffTime < 0 &&
                      new BigNumber(currentBidderAmount).isLessThan(
                        reserveAmount,
                      )
                    ) {
                      return AuctionState.NotSoldByReservePrice;
                    }

                    return AuctionState.Live;
                  })(),
                  tokenContract: pool.token0,
                  unitContract: pool.token1,
                  tokenAmount0: pool.tokenAmount0,
                  tokenId: parseInt(pool.tokenId),

                  role: (() => {
                    if (lastBidderAddress === address) {
                      return 'buyer';
                    }

                    if (pool.creator === address) {
                      return 'creator';
                    }

                    return 'others';
                  })(),
                  bidCountPool,
                  myClaimedPool,
                  currentBidderPool: lastBidderAddress,
                  creatorClaimedPool,
                  reserveAmount1Pool: reserveAmount,
                  showPrice,
                } as IFetchWeb3PoolDetailsData;
              }
            })(),
          };
        },
        asQuery: true,
      },
    };
  },
);
