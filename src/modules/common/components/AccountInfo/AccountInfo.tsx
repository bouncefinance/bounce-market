import { useDispatchRequest } from '@redux-requests/react';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import React, { useEffect, useState } from 'react';
import {
  IAccountInfo,
  queryAccountInfo,
} from '../../../common/actions/queryAccountInfo';
import { ProfileInfo } from '../ProfileInfo';

export const AccountInfo = ({ account }: { account: string }) => {
  const dispatch = useDispatchRequest();

  const [accountInfo, setAccountInfo] = useState<IAccountInfo>();

  useEffect(() => {
    dispatch(queryAccountInfo(account)).then(res => {
      setAccountInfo(res.data);
    });
  }, [account, dispatch]);

  return (
    <ProfileInfo
      subTitle="Owner"
      title={accountInfo?.username ?? truncateWalletAddr(account)}
      users={[
        {
          name: accountInfo?.username ?? truncateWalletAddr(account),
          avatar: accountInfo?.imgurl,
        },
      ]}
    />
  );
};
