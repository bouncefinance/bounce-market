import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar } from '@material-ui/core';
import { useGiftHeaderStyles } from './useGiftHeaderStyles';
import classNames from 'classnames';
import { Logo } from 'modules/layout/components/Logo';
import { useIsXSDown } from 'modules/themes/useTheme';
import { getAirdropInfo } from 'modules/gift/actions/getAirdropInfo';
import { useDispatchRequest } from '@redux-requests/react';
import { DefaultRandomAvatar } from 'modules/common/components/DefaultRandomAvatar';

export type IGiftHeaderProps = {
  className?: string;
  airdropId: number;
  isLogoVisible?: boolean;
  // brandAvatar?: string;
  // brandName?: string;
  title?: string;
  description?: string;
};

export const GiftHeader: React.FC<IGiftHeaderProps> = ({
  className,
  airdropId,
  isLogoVisible = true,
  // brandAvatar,
  // brandName,
  title,
  description,
}) => {
  const isXSDown = useIsXSDown();
  const dispatchRequest = useDispatchRequest();
  const props = { isXSDown };

  const styles = useGiftHeaderStyles(props);

  const [brandAvatar, setBrandAvatar] = useState<string>();
  const [brandName, setBrandName] = useState<string>();

  useEffect(() => {
    dispatchRequest(getAirdropInfo({ dropsid: +airdropId })).then(res => {
      console.log('res: ', res);
      setBrandAvatar(res.data?.avatar);
      // TODO: creator换成brandname，等待接口添加brandname字段
      setBrandName(res.data?.creator);
    });
  }, [dispatchRequest, airdropId]);

  return (
    <Box className={classNames(styles.root, className)}>
      {/* {isLogoVisible && (
        <Box className={styles.logo}>
          <Logo />
        </Box>
      )} */}

      <Box className={styles.brandInfo}>
        <DefaultRandomAvatar className={styles.brandAvatar} src={brandAvatar} />
        <Typography variant="h5" className={styles.brandName}>
          {brandName || 'Unnamed'}
        </Typography>
      </Box>

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
