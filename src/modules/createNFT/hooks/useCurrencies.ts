import { useQuery } from '@redux-requests/react';
import { getApeContract } from 'modules/common/hooks/contractHelps';
import {  getNativeTokenSymbol, ZERO_ADDRESS } from 'modules/common/conts';
import { useMemo } from 'react';
import { setAccount } from '../../account/store/actions/setAccount';
import { TokenSymbol } from '../../common/types/TokenSymbol';

const ENABLE_FIXED_TOKENS = false;
const FT_FIXED_TOKENS = !true

export function getFTAddress(chainId: number) {
  switch (chainId) {
    case 1:
      return '';
    case 4:
      return process.env.REACT_APP_FT_CONTRACT_ADDRESS_RINKEBY ?? '';
    case 97:
      return '';
    case 56:
      return '';
    default:
      return '';
  }
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
                label: getNativeTokenSymbol(chainId),
                value: ZERO_ADDRESS,
                contract: ZERO_ADDRESS,
                decimals: 18,
              },
              ...(chainId === 56 && ENABLE_FIXED_TOKENS
                ? [
                    {
                      label: TokenSymbol.BUSD,
                      value: getBUSDAddress(chainId),
                      decimals: 18,
                    },
                  ]
                : []),
              ...(ENABLE_FIXED_TOKENS
                ? [
                    {
                      label: TokenSymbol.USDT,
                      value: getUSDTAddress(chainId),
                      decimals: chainId === 56 ? 18 : 6,
                    },
                    {
                      label: TokenSymbol.USDC,
                      value: getUSDCAddress(chainId),
                      decimals: 18,
                    },
                  ]
                : []),
                ...(FT_FIXED_TOKENS
                  ? [
                      {
                        label: 'APE',
                        value: getApeContract(chainId),
                        decimals: 18,
                      },
                    ]
                  : []),
            ],
            default: ZERO_ADDRESS,
            // default: getApeContract(chainId),
          }
        : { options: [], default: undefined },
    [chainId],
  );
}
