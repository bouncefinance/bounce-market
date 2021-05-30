import {
  IFetchPoolDetailsData,
  isEnglishAuction,
} from '../../overview/actions/fetchPoolDetails';
import { AuctionState } from '../../common/const/AuctionState';
import { FixedSwapState } from '../../common/const/FixedSwapState';

export function getPublishedCount(
  data: IFetchPoolDetailsData[],
  tokenId: number,
) {
  return (
    data.reduce((acc, pool) => {
      if (pool.tokenId === tokenId) {
        if (isEnglishAuction(pool)) {
          if (pool.state <= AuctionState.Live) {
            return acc + pool.tokenAmount0;
          }

          return acc;
        } else {
          if (pool.state <= FixedSwapState.Live) {
            return acc + pool.quantity;
          } else {
            return acc;
          }
        }
      }

      return acc;
    }, 0) ?? 0
  );
}
