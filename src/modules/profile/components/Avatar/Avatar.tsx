import {
  Avatar as AvatarComponent,
  AvatarProps,
  IconButton,
} from '@material-ui/core';
import classNames from 'classnames';
import { PencilIcon } from 'modules/common/components/Icons/PencilIcon';
import { VerifiedIcon } from './assets/VerifiedIcon';
import { useAvatarStyles } from './useAvatarStyles';

interface IAvatarProps extends AvatarProps {
  onEditClick?: () => void;
  isEditable?: boolean;
  isVerified?: boolean;
}

export const Avatar = ({
  className,
  onEditClick,
  isEditable = false,
  isVerified = false,
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
      <div className={classes.avatarBox}>
        <AvatarComponent {...restProps} className={classes.avatar} />
        {isVerified && <VerifiedIcon className={classes.verifiedIcon} />}
      </div>

      {isEditable && (
        <IconButton className={classes.editButton} onClick={onEditClick}>
          <PencilIcon />
        </IconButton>
      )}
    </div>
  );
};
