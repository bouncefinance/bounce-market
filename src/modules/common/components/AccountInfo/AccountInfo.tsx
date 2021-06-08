import { useDispatchRequest } from '@redux-requests/react';
import { convertWallet } from 'modules/common/utils/convertWallet';
import React, { useEffect, useState } from 'react';
import { IAccountInfo, queryAccountInfo } from '../../../common/actions/queryAccountInfo';
import { ProfileInfo } from '../ProfileInfo';

export const AccountInfo = ({
  account,
}: {
  account: string;
}) => {
  const dispatch = useDispatchRequest();

  const [accountInfo, setAccountInfo] = useState<IAccountInfo>();

  useEffect(() => {
    dispatch(queryAccountInfo(account))
      .then(res => {
        setAccountInfo(res.data)
      })
  }, [account, dispatch]);


  return <ProfileInfo
      subTitle="Owner"
      title={accountInfo?.username ?? convertWallet(account)}
      users={[
        {
          name: accountInfo?.username ?? convertWallet(account),
          avatar: accountInfo?.imgurl,
        },
      ]}
    />
}