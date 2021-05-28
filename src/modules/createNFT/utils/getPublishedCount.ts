import {
  IFetchPoolDetailsData,
  isEnglishAuction,
} from '../../overview/actions/fetchPoolDetails';

export function getPublishedCount(
  data: IFetchPoolDetailsData[],
  tokenId: number,
) {
  return (
    data.reduce((acc, pool) => {
      if (pool.tokenId === tokenId) {
        return (
          acc + (isEnglishAuction(pool) ? pool.tokenAmount0 : pool.quantity)
        );
      }

      return acc;
    }, 0) ?? 0
  );
}
