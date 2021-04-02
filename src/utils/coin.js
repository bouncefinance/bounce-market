import { getBUSDAddress, getUSDCAddress, getUSDTAddress } from "@/web3/address_list/token";

// TODO BNB 
// TODO BUSD null address
/**
 * const { chainId } = useActiveWeb3React()
 * @param {number} chainId 
 * @returns {
      value: string;
      contract: string;
      decimals: number;
  }[]
 */
export function getCoinList (chainId) {
       return [
          {
            value: chainId === 56 ? 'BNB' : 'ETH',
            contract: '0x0000000000000000000000000000000000000000',
            decimals: 18
          }, {
            value: 'BUSD',
            contract: getBUSDAddress(chainId),
            decimals: 18
          },
          {
            value: "USDT",
            contract: getUSDTAddress(chainId),
            decimals: 6
          },
          {
            value: "USDC",
            contract: getUSDCAddress(chainId),
            decimals: 18
          }
  ]
 
}