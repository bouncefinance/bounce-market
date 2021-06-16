import { useDispatchRequest } from '@redux-requests/react';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import React, { useEffect, useState } from 'react';
import {
  IAccountInfo,
  queryAccountInfo,
} from '../../../common/actions/queryAccountInfo';
import { ProfileInfo } from '../ProfileInfo';

export const AccountInfo = ({ address }: { address: string }) => {
  const dispatch = useDispatchRequest();

  const [accountInfo, setAccountInfo] = useState<IAccountInfo>();

  useEffect(() => {
    dispatch(
      queryAccountInfo({ accountAddress: address }, { asMutation: true }),
    ).then(res => {
      setAccountInfo(res.data);
    });
  }, [address, dispatch]);

  return (
    <ProfileInfo
      subTitle="Owner"
      title={accountInfo?.username ?? truncateWalletAddr(address)}
      users={[
        {
          href: ProfileRoutesConfig.OtherProfile.generatePath(address),
          name: accountInfo?.username ?? truncateWalletAddr(address),
          avatar: accountInfo?.imgUrl,
        },
      ]}
    />
  );
};
