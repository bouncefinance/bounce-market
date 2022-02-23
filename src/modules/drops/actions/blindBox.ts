import { RootState } from '@react-three/fiber';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { Store } from '@reduxjs/toolkit';
import { setAccount } from 'modules/account/store/actions/setAccount';
import { IBuyCoinFormData } from 'modules/common/components/BuyBlindBox/buyBlindBoxDialog';
import { ApeBlindBox } from 'modules/web3/contracts';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

export interface IBlindBoxItem {
  contract: string;
  cover_url: string;
  description: string;
  id: string;
  // 1: not limit; 2：limit white
  join_type: 1 | 2;
  // nft name
  name: string;
  // blind box name
  title: string;
  open_ts: number; // Don't have to
  start_ts: number;
  end_ts: number;
  // id during the blindBox event
  phase_id: string;
  // white to not white
  public_ts: number;
  total_supply: number;
  price: string;
}
export interface IBlindBoxList {
  code: number;
  msg?: string;
  data: IBlindBoxItem[];
  total: number;
}
export const fetchBlindBoxList = createSmartAction<
  RequestAction<IBlindBoxList, IBlindBoxList>,
  [{}]
>('blindBoxList', () => {
  return {
    request: {
      url: '/drops',
      method: 'get',
      params: {
        limit: 20,
      },
    },
    meta: {
      asMutation: false,
      driver: 'axios',
      getData: (data: IBlindBoxList) => {
        if (data.code !== 1) {
          throw new Error(data.msg);
        }
        return data;
      },
      onSuccess: (
        response: any,
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return response;
      },
    },
  };
});
export const buyBlindBox = createSmartAction<
  RequestAction<any, any>,
  [IBuyCoinFormData, string]
>('buyBox', ({ quantity, price }, blindBoxId: string) => {
  return {
    request: {
      promise: (async function () {})(),
    },
    meta: {
      onRequest: (
        request: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async function () {
            const {
              data: { chainId, address, web3 },
            } = getQuery(store.getState(), {
              type: setAccount.toString(),
              action: setAccount,
            });
            const BLIND_BOX = getApeBlindBoxContract(chainId);
            console.log('BLIND_BOX----->', BLIND_BOX, blindBoxId);
            // const unitContract = getApeContract(chainId);
            const ApeBlindBox_CT = new web3.eth.Contract(
              ApeBlindBox,
              BLIND_BOX,
            );
            // const BounceERC20_CT = new web3.eth.Contract(
            //   BounceERC20,
            //   unitContract,
            // );
            const approveVal = new BigNumber(price).multipliedBy(quantity);
            try {
              // const allowance = await BounceERC20_CT.methods
              //   .allowance(address, BLIND_BOX)
              //   .call();
              // console.log('allowance---->', allowance);
              // if (
              //   new BigNumber(allowance)
              //     .dividedBy(approveVal.multipliedBy(1e18))
              //     .isLessThan(1)
              // ) {
              //   const approveRes = await BounceERC20_CT.methods
              //     .approve(BLIND_BOX, approveVal.multipliedBy(1e18).toString())
              //     .send({ from: address });
              //   if (!approveRes) {
              //     throw new Error('approve error');
              //   }
              // }

              const buy = () =>
                new Promise((resolve, reject) => {
                  ApeBlindBox_CT.methods
                    .buyBox(blindBoxId)
                    .send({
                      from: address,
                      value: approveVal.multipliedBy(1e18).toString(),
                    })
                    .on('transactionHash', (hash: string) => {
                      // Pending status
                    })
                    .on('receipt', async (receipt: TransactionReceipt) => {
                      resolve(receipt);
                    })
                    .on('error', (error: Error) => {
                      reject(error);
                    });
                });

              await buy();
            } catch (error) {
              throw new Error('catch error');
            }

            return true;
          })(),
        };
      },
      asMutation: true,
    },
  };
});

export const getApeBlindBoxContract = (chainID: number) => {
  switch (chainID) {
    // TODO
    case 1:
      return process.env.REACT_APP_BLIND_BOX_CONTRACT_ADDRESS_RINKEBY;
    case 4:
      return process.env.REACT_APP_BLIND_BOX_CONTRACT_ADDRESS_RINKEBY;
    // TODO
    case 56:
      return process.env.REACT_APP_BLIND_BOX_CONTRACT_ADDRESS_RINKEBY;
    default:
      return process.env.REACT_APP_BLIND_BOX_CONTRACT_ADDRESS_RINKEBY;
  }
};
