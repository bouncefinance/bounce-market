import { Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import { PlusIcon } from 'modules/common/components/Icons/PlusIcon';
import { UserIcon } from 'modules/common/components/Icons/UserIcon';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import React from 'react';
import { useSubscribersStyles } from './useSubscribersStyles';

interface ISubscribersProps {
  className?: string;
  count?: number;
  withFollow?: boolean;
  onFollowClick?: () => void;
}

export const Subscribers = ({
  className,
  count = 0,
  withFollow = false,
  onFollowClick,
}: ISubscribersProps) => {
  const classes = useSubscribersStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <Tooltip title={t('profile.subscribers')} arrow>
        <span
          className={classNames(
            classes.count,
            withFollow && classes.countWithFollow,
          )}
        >
          <UserIcon
            className={classNames(classes.icon, classes.iconOffsetRight)}
          />

          {count}
        </span>
      </Tooltip>

      {withFollow && (
        <Button
          className={classes.followBtn}
          onClick={onFollowClick}
          variant="outlined"
        >
          <PlusIcon
            className={classNames(classes.icon, classes.iconOffsetRight)}
          />
          {t('profile.follow')}
        </Button>
      )}
    </div>
  );
};
