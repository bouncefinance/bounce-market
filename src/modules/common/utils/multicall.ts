import { AbiItem } from 'web3-utils';
import { Interface } from '@ethersproject/abi';
import { MultiCallAbi } from 'modules/web3/contracts';
import Web3 from 'web3';
import { getMultiCallAddress } from './addressHelps';

interface Call {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: any[]; // Function params
}

export interface CallType {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: any[]; // Function params
  abi: any[];
}

const multiCall = async (
  abi: any[],
  calls: Call[],
  web3: Web3,
  chainID: number,
) => {
  const multi = new web3.eth.Contract(
    (MultiCallAbi as unknown) as AbiItem,
    getMultiCallAddress(chainID),
  );
  const itf = new Interface(abi);

  const calldata = calls.map(call => [
    call.address.toLowerCase(),
    itf.encodeFunctionData(call.name, call.params),
  ]);
  const { returnData } = await multi.methods.aggregate(calldata).call();
  const res = returnData.map((call: any, i: number) =>
    itf.decodeFunctionResult(calls[i].name, call),
  );

  return res;
};

export const multiCall2 = async (
  calls: CallType[],
  web3: Web3,
  chainID: number,
) => {
  const multi = new web3.eth.Contract(
    (MultiCallAbi as unknown) as AbiItem,
    getMultiCallAddress(chainID),
  );

  const getItf = (abi: any[]) => new Interface(abi);

  const calldata = calls.map(call => [
    call.address.toLowerCase(),
    getItf(call.abi).encodeFunctionData(call.name, call.params),
  ]);
  const { returnData } = await multi.methods.aggregate(calldata).call();
  const res = returnData.map((call: any, i: number) => {
    return getItf(calls[i].abi).decodeFunctionResult(calls[i].name, call);
  });

  return res;
};

export default multiCall;
