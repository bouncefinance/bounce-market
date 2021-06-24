import { useDispatchRequest } from '@redux-requests/react';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import React, { useEffect, useState, useMemo } from 'react';
import { t } from 'modules/i18n/utils/intl';
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

  const href = useMemo(
    () => ProfileRoutesConfig.OtherProfile.generatePath(address),
    [address],
  );

  return (
    <ProfileInfo
      subTitle={t('product-card.owner')}
      title={accountInfo?.username ?? truncateWalletAddr(address)}
      mainHref={href}
      users={[
        {
          href: href,
          name: accountInfo?.username ?? truncateWalletAddr(address),
          avatar: accountInfo?.imgUrl,
        },
      ]}
    />
  );
};
