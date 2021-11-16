import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useGiftHeaderStyles } from './useGiftHeaderStyles';
import classNames from 'classnames';
import { useIsXSDown } from 'modules/themes/useTheme';
import { getAirdropInfo } from 'modules/gift/actions/getAirdropInfo';
import { useDispatchRequest } from '@redux-requests/react';
import { DefaultRandomAvatar } from 'modules/common/components/DefaultRandomAvatar';
import { useAccount } from 'modules/account/hooks/useAccount';
import { Skeleton } from '@material-ui/lab';

export type IGiftHeaderProps = {
  className?: string;
  airdropId?: number;
  title?: string;
  description?: string;
};

export const GiftHeader: React.FC<IGiftHeaderProps> = ({
  className,
  airdropId,
  title,
  description,
}) => {
  const isXSDown = useIsXSDown();
  const dispatchRequest = useDispatchRequest();
  const styles = useGiftHeaderStyles({ isXSDown });
  const { isConnected } = useAccount();

  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [brandAvatar, setBrandAvatar] = useState<string>();
  const [brandName, setBrandName] = useState<string>();

  useEffect(() => {
    if (!airdropId || !isConnected) {
      return;
    }

    try {
      dispatchRequest(getAirdropInfo({ dropsid: +airdropId }))
        .then(res => {
          setBrandAvatar(res.data?.avatar);
          setBrandName(res.data?.airdropinfo.brandname);
        })
        .then(() => setDataLoading(false));
    } catch (error) {
      console.log('getAirdropInfo error');
    }
  }, [dispatchRequest, airdropId, isConnected]);

  return (
    <Box className={classNames(styles.root, className)}>
      {airdropId &&
        (dataLoading ? (
          <Box className={styles.brandInfo}>
            <Skeleton
              className={styles.skeleton}
              variant="circle"
              width={40}
              height={40}
            />
            <Skeleton
              className={styles.skeleton}
              variant="rect"
              width={120}
              height={20}
            />
          </Box>
        ) : (
          <Box className={styles.brandInfo}>
            <DefaultRandomAvatar
              className={styles.brandAvatar}
              src={brandAvatar}
            />
            <Typography variant="h5" className={styles.brandName}>
              {brandName || ''}
            </Typography>
          </Box>
        ))}

      {title && title.length > 0 && (
        <Typography variant="h2" className={styles.title}>
          {title}
        </Typography>
      )}

      {description && description.length > 0 && (
        <Typography variant="h5" className={styles.description}>
          {description}
        </Typography>
      )}
    </Box>
  );
};
