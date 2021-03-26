import Web3 from "web3";
import { BigNumber } from 'bignumber.js';
BigNumber.config({ EXPONENTIAL_AT: [-30, 30] })

export const getWei = (decimals) => {
  switch (decimals) {
    case '0':
      return 'nanoether'
    case '1':
      return 'wei';
    case '3':
      return 'kwei'
    case '6':
      return 'mwei'
    case '9':
      return 'gwei'
    case '12':
      return 'szabo'
    case '15':
      return 'finney'
    case '18':
      return 'ether'
    default:
      return 'ether'
  }
}


export const fromWei = (value, decimals = 18) => {
  return new BigNumber(value).dividedBy(new BigNumber(10).pow(decimals))
}

const toWei = (value, decimals) => {
  return new BigNumber(value).multipliedBy(new BigNumber(10).pow(decimals))
}

export const weiToNumber = (value, decimals, fixed = 6) => {
  return new BigNumber(new BigNumber(Web3.utils.fromWei(value, getWei(decimals))).toFixed(fixed, 1)).toNumber()
};

export const weiToNum = (value, decimals = 18, fixed = 6) => {
  return new BigNumber(fromWei(value, decimals).toFixed(fixed === -1 ? null : fixed, 1)).toNumber().toString()
};

export const numToWei = (value, decimals = 18) => {
  return new BigNumber(toWei(value, decimals).toNumber().toFixed(6, 1)).toString()
};

export const weiDiv = (value1, value2, fixed = 6) => {
  return new BigNumber(new BigNumber(value1).dividedBy(new BigNumber(value2)).toFixed(fixed)).toString()
};


export const numberToNumber = (value, decimals) => {
  return new BigNumber(new BigNumber(value).toFixed(8)).toNumber()
};

export const getProgress = (bidAmount, amount) => {
  return new BigNumber(bidAmount).dividedBy(new BigNumber(amount)).multipliedBy(100)
}

export const getRatio = (fromTotal, decimals1 = 18, toTotal, decimals2 = 18) => {
  const fromBN = new BigNumber(fromWei(fromTotal, decimals1))
  const toBN = new BigNumber(fromWei(toTotal, decimals2))
  return new BigNumber(fromBN.div(toBN).toFixed(8)).toNumber();
}

export const weiSub = (value1, value2, fixed = 6) => {
  return new BigNumber(new BigNumber(value1).minus(new BigNumber(value2)).toFixed(fixed)).toString()
};

export const weiMul = (value1, value2, fixed = 6) => {
  return new BigNumber(new BigNumber(value1).multipliedBy(new BigNumber(value2)).toFixed(fixed)).toString()
};
