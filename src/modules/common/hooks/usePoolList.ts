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
import { getPoolAddress, getPoolContract } from './contractHelps';

interface bidList {
  poolId: number;
  poolType: AuctionType;
}
export const usePoolList = ({
  list,
  contractFunctionName,
}: {
  list: bidList[];
  contractFunctionName: string;
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
          params: [poolId],
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
