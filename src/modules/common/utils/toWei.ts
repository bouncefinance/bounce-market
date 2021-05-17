import Web3 from 'web3';
import { getUnitPrecisionNameByPow } from './fromWei';

export function toWei(value: string, pow: number) {
  return Web3.utils.toWei(value, getUnitPrecisionNameByPow(pow));
}
