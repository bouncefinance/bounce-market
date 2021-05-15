import Web3 from 'web3';
import { count } from './count';

const UNIT_NOT_FOUND_ERROR = new Error('Unit not found');

export function getUnitPrecisionNameByPow(pow: number) {
  const unitMap = (Web3.utils.unitMap as unknown) as ReturnType<
    typeof Web3.utils.unitMap
  >;

  type Unit = keyof typeof unitMap;

  const name = Object.keys(unitMap)
    .reverse()
    .find(key => {
      return count(unitMap[key as Unit], '0') === pow;
    });

  if (!name) {
    throw UNIT_NOT_FOUND_ERROR;
  }

  return name as Unit;
}

export function fromWei(value: string, pow: number) {
  return Web3.utils.fromWei(value, getUnitPrecisionNameByPow(pow));
}
