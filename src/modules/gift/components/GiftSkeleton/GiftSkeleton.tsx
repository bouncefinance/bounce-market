import React from 'react';
import { Box } from '@material-ui/core';
import { useGiftSkeletonStyles } from './useGiftSkeletonStyles';
import classNames from 'classnames';
import { useIsXSDown } from 'modules/themes/useTheme';
import { Skeleton } from '@material-ui/lab';

export type IGiftSkeletonProps = {
  className?: string;
  airdropId?: number;
  title?: string;
  description?: string;
};

export const GiftSkeleton: React.FC<IGiftSkeletonProps> = ({ className }) => {
  const isXSDown = useIsXSDown();
  const styles = useGiftSkeletonStyles({ isXSDown });

  return (
    <Box className={classNames(styles.root, className)}>
      <Skeleton
        className={classNames(
          styles.skeleton,
          isXSDown ? styles.mobileAvatar : styles.desktopAvatar,
        )}
        variant="circle"
        width={170}
        height={170}
      />
      <Skeleton
        className={styles.skeleton}
        variant="text"
        width={410}
        height={22}
      />
      <Skeleton
        className={styles.skeleton}
        variant="text"
        width={410}
        height={22}
      />
      <Skeleton
        className={styles.skeleton}
        variant="text"
        width={410}
        height={22}
      />
      <Skeleton
        className={styles.skeleton}
        variant="text"
        width={410}
        height={22}
      />

      <Skeleton
        className={classNames(
          styles.skeleton,
          styles.continueBtn,
          isXSDown ? styles.mobileContinueBtn : styles.desktopContinueBtn,
        )}
        variant="rect"
        width={170}
        height={50}
      />

      <Skeleton
        className={classNames(styles.skeleton, styles.description)}
        variant="text"
        width={360}
        height={22}
      />
      <Skeleton
        className={classNames(styles.skeleton, styles.description)}
        variant="text"
        width={360}
        height={22}
      />
    </Box>
  );
};
