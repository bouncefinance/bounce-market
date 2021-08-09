export const getPoolKey = (like: { poolId: number; poolType: string }) =>
  [like.poolId, like.poolType].join(',');
