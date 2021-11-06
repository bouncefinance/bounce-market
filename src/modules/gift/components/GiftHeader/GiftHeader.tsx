import React from 'react';
import { Box, Typography, Avatar } from '@material-ui/core';
import { useGiftHeaderStyles } from './useGiftHeaderStyles';
import classNames from 'classnames';
import { Logo } from 'modules/layout/components/Logo';
import { useIsXSDown } from 'modules/themes/useTheme';

export type IGiftHeaderProps = {
  className?: string;
  brandAvatar?: string;
  brandName?: string;
  title?: string;
  description?: string;
};

export const GiftHeader: React.FC<IGiftHeaderProps> = ({
  className,
  brandAvatar,
  brandName,
  title,
  description,
}) => {
  const isXSDown = useIsXSDown();
  const props = { isXSDown };

  const styles = useGiftHeaderStyles(props);

  return (
    <Box className={classNames(styles.root, className)}>
      <Box className={styles.logo}>
        <Logo />
      </Box>

      <Box className={styles.brandInfo}>
        <Avatar className={styles.brandAvatar} src={brandAvatar} />
        <Typography variant="h5" className={styles.brandName}>
          {brandName}
        </Typography>
      </Box>

      <Typography variant="h2" className={styles.title}>
        {title}
      </Typography>

      <Typography variant="h5" className={styles.description}>
        {description}
      </Typography>
    </Box>
  );
};
