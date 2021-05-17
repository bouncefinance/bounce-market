import {
  Avatar as AvatarComponent,
  AvatarProps,
  IconButton,
} from '@material-ui/core';
import classNames from 'classnames';
import { PencilIcon } from 'modules/common/components/Icons/PencilIcon';
import React from 'react';
import { useAvatarStyles } from './useAvatarStyles';

interface IAvatarProps extends AvatarProps {
  onEditClick?: () => void;
  isEditable?: boolean;
}

export const Avatar = ({
  className,
  onEditClick,
  isEditable = false,
  ...restProps
}: IAvatarProps) => {
  const classes = useAvatarStyles();

  return (
    <div
      className={classNames(
        classes.root,
        className,
        isEditable && classes.editable,
      )}
    >
      <AvatarComponent {...restProps} className={classes.avatar} />

      {isEditable && (
        <IconButton className={classes.editButton} onClick={onEditClick}>
          <PencilIcon />
        </IconButton>
      )}
    </div>
  );
};
