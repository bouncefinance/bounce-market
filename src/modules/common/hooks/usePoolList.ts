import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { AuctionType } from 'modules/api/common/auctionType';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { CallType, multiCall2 } from '../utils/multicall';
import { getPoolKey } from '../utils/poolHelps';
import { getPoolAddress, getPoolContract } from './contractHelps';

interface bidList {
  poolId: number;
  poolType: AuctionType;
}
export const usePoolList = ({
  list,
  contractFunctionName,
  address = '',
}: {
  list: bidList[];
  contractFunctionName: string;
  address?: string;
}) => {
  const {
    data: { chainId, web3 },
  } = useQuery<ISetAccountData>({
    type: setAccount.toString(),
  });
  const [bidsInfo, setBidsInfo] = useState<BigNumber[]>([]);

  useEffect(() => {
    (async () => {
      const calls: CallType[] = list.map(({ poolType, poolId }) => {
        return {
          address: getPoolAddress({ poolType, chainId }) ?? '',
          name: contractFunctionName,
          params:
            contractFunctionName === 'myBidderAmount1P'
              ? [address, poolId]
              : [poolId],
          abi: (getPoolContract(poolType) as unknown) as any[],
        };
      });
      const InfoList = await multiCall2(calls, web3, chainId);
      setBidsInfo(
        InfoList.map((e: any) => {
          return new BigNumber(Web3.utils.fromWei(e[0]._hex));
        }),
      );
    })();
    // eslint-disable-next-line
  }, [chainId, contractFunctionName, list.length]);
  return bidsInfo;
};

export const useLikesMap = <T>(
  likes: T[],
  mapFunction?: (like: T) => string,
) => {
  const [likesMap, setLikesMap] = useState<Map<string, boolean>>();
  useEffect(() => {
    const map = new Map<string, boolean>();
    (likes ?? []).forEach(like => {
      map.set(
        mapFunction
          ? mapFunction(like)
          : getPoolKey(
              (like as unknown) as {
                poolId: number;
                poolType: string;
              },
            ),
        true,
      );
    });
    setLikesMap(map);
    // eslint-disable-next-line
  }, [likes]);
  return { likesMap };
};
