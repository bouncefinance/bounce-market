import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { isFixedSwap } from 'modules/common/utils/poolHelps';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { setAccount } from '../../account/store/actions/setAccount';
import { AuctionState } from '../../api/common/AuctionState';
import { AuctionType } from '../../api/common/auctionType';
import { FixedSwapState } from '../../api/common/FixedSwapState';
import { fromWei } from '../../common/utils/fromWei';
import { throwIfDataIsEmptyOrError } from '../../common/utils/throwIfDataIsEmptyOrError';
import {
  getEnglishAuctionContract,
  getFixedSwapContract,
} from '../../createNFT/actions/publishNft';
import {
  BounceEnglishAuctionNFT,
  BounceEnglishAuctionNFTTime,
  BounceFixedSwapNFT,
  BounceFixedSwapNFTTime,
} from '../../web3/contracts';
import { fetchCurrency } from './fetchCurrency';
import {
  IEnglishAuctionDetails,
  IFixedAuctionDetails,
} from './fetchPoolDetails';

export type UserRole = 'creator' | 'buyer' | 'others';
export enum UserNftRoleEnum {
  CREATOR = 'creator',
  BUYER = 'buyer',
  OTHERS = 'others',
}

interface IWeb3FixedAuctionDetails extends IFixedAuctionDetails {
  role: UserRole;
}
interface IWeb3EnglishAuctionDetails extends IEnglishAuctionDetails {
  role: UserRole;
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

              if (isFixedSwap(poolType)) {
                const BounceFixedSwapNFT_CT = new web3.eth.Contract(
                  poolType === AuctionType.FixedSwap_Timing
                    ? BounceFixedSwapNFTTime
                    : BounceFixedSwapNFT,
                  getFixedSwapContract(
                    chainId,
                    poolType === AuctionType.FixedSwap_Timing,
                  ),
                );

                const pool = await BounceFixedSwapNFT_CT.methods
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
                      { unitContract: pool.token1 },
                      { silent: true },
                    ),
                  ),
                );
                return {
                  totalQuantity: pool.amountTotal0,
                  quantity:
                    parseInt(pool.amountTotal0) - parseInt(swappedAmount0Pool),
                  // TODO: Apply precision
                  totalPrice: new BigNumber(
                    web3.utils.fromWei(pool.amountTotal1),
                  ),
                  createTime: new Date(),
                  creator: pool.creator,
                  name: pool.name,
                  nftType: parseInt(pool.nftType),
                  poolId,
                  price: new BigNumber(
                    fromWei(pool.amountTotal1, decimals),
                  ).dividedBy(pool.amountTotal0),
                  state: (() => {
                    if (creatorCanceledPool) {
                      return FixedSwapState.Canceled;
                    } else if (
                      parseInt(swappedAmount0Pool) < parseInt(pool.amountTotal0)
                    ) {
                      return FixedSwapState.Live;
                    } else if (
                      parseInt(swappedAmount0Pool) ===
                      parseInt(pool.amountTotal0)
                    ) {
                      return FixedSwapState.Completed;
                    } else {
                      return FixedSwapState.Claimed;
                    }
                  })(),
                  role: (() => {
                    if (pool.creator === address) {
                      return 'creator';
                    }

                    return 'others';
                  })(),
                  tokenContract: pool.token0,
                  unitContract: pool.token1,
                  tokenId: parseInt(pool.tokenId),
                  openAt: new Date(pool.openAt * 1e3),
                } as IFetchWeb3PoolDetailsData;
              } else if (
                poolType === AuctionType.EnglishAuction ||
                poolType === AuctionType.EnglishAuction_Timing
              ) {
                const BounceEnglishAuctionNFT_CT = new web3.eth.Contract(
                  poolType === AuctionType.EnglishAuction_Timing
                    ? BounceEnglishAuctionNFTTime
                    : BounceEnglishAuctionNFT,
                  getEnglishAuctionContract(
                    chainId,
                    poolType === AuctionType.EnglishAuction_Timing,
                  ),
                );
                const pool = await BounceEnglishAuctionNFT_CT.methods
                  .pools(poolId)
                  .call();
                const currentBidderAmount = await BounceEnglishAuctionNFT_CT.methods
                  .currentBidderAmount1P(poolId)
                  .call();
                const myClaimedPool = await BounceEnglishAuctionNFT_CT.methods
                  .myClaimedP(address, poolId)
                  .call();
                // const creatorClaimedPool = await BounceEnglishAuctionNFT_CT.methods
                //   .creatorClaimedP(poolId)
                //   .call();
                const reserveAmount = await BounceEnglishAuctionNFT_CT.methods
                  .reserveAmount1P(poolId)
                  .call();
                const lastBidderAddress = await BounceEnglishAuctionNFT_CT.methods
                  .currentBidderP(poolId)
                  .call();
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
                const amountMax1 = new BigNumber(
                  fromWei(pool.amountMax1, decimals),
                );
                return {
                  amountMax1: amountMax1,
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
                      myClaimedPool
                      // || creatorClaimedPool
                    ) {
                      return AuctionState.Claimed;
                    }

                    if (
                      new BigNumber(currentBidderAmount).isGreaterThanOrEqualTo(
                        pool.amountMax1,
                      ) &&
                      amountMax1.isGreaterThan(0)
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
                  openAt: new Date(pool.openAt * 1e3),
                  role: (() => {
                    if (lastBidderAddress === address) {
                      return 'buyer';
                    }

                    if (pool.creator === address) {
                      return 'creator';
                    }

                    return 'others';
                  })(),
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
