import { useQuery } from '@redux-requests/react';
import { useMemo } from 'react';
import { setAccount } from '../../account/store/actions/setAccount';

export enum Currency {
  BNB = 'BNB',
  ETH = 'ETH',
  BUSD = 'BUSD',
  USDT = 'USDT',
  USDC = 'USDC',
}

function getUSDTAddress(chainId: number) {
  switch (chainId) {
    case 1:
      return '0xdac17f958d2ee523a2206206994597c13d831ec7';
    case 4:
      return '0x101194a3FF67f83A05B3E15AfA52D45D588614ca';
    case 97:
      return '';
    case 56:
      return '0x55d398326f99059ff775485246999027b3197955';
    default:
      return '0xdac17f958d2ee523a2206206994597c13d831ec7';
  }
}

function getUSDCAddress(chainId: number) {
  switch (chainId) {
    case 1:
      return '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    case 4:
      return '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b';
    case 97:
      return '';
    case 56:
      return '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
    default:
      return '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
  }
}

function getBUSDAddress(chainId: number) {
  switch (chainId) {
    case 1:
      return '';
    case 4:
      return '';
    case 97:
      return '';
    case 56:
      return '0xe9e7cea3dedca5984780bafc599bd69add087d56';
    default:
      return '0xe9e7cea3dedca5984780bafc599bd69add087d56';
  }
}

export function useCurrencies() {
  const { data } = useQuery({
    type: setAccount.toString(),
    action: setAccount,
  });

  // TODO Remove 56
  const chainId = data?.chainId ?? 56;

  return useMemo(
    () =>
      chainId
        ? {
            options: [
              {
                label: chainId === 56 ? Currency.BNB : Currency.ETH,
                value: '0x0000000000000000000000000000000000000000',
                contract: '0x0000000000000000000000000000000000000000',
                decimals: 18,
              },
              ...(chainId === 56
                ? [
                    {
                      label: Currency.BUSD,
                      value: getBUSDAddress(chainId),
                      decimals: 18,
                    },
                  ]
                : []),
              {
                label: Currency.USDT,
                value: getUSDTAddress(chainId),
                decimals: chainId === 56 ? 18 : 6,
              },
              {
                label: Currency.USDC,
                value: getUSDCAddress(chainId),
                decimals: 18,
              },
            ],
            default: '0x0000000000000000000000000000000000000000',
          }
        : { options: [], default: undefined },
    [chainId],
  );
}
