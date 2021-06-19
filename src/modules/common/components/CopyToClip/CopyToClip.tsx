import { IconButton, Tooltip, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { CopyIcon } from 'modules/common/components/Icons/CopyIcon';
import { DoneIcon } from 'modules/common/components/Icons/DoneIcon';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useCopyToClipStyles } from './useCopyToClipStyles';

interface ICopyToClipProps {
  address: string;
}

export const CopyToClip = ({ address }: ICopyToClipProps) => {
  const classes = useCopyToClipStyles();
  const [isCopy, setCopy] = useState<boolean>(false);

  useEffect(() => {
    if (isCopy) {
      setTimeout(() => {
        setCopy(false);
        (document.activeElement as any)?.blur();
      }, 1000);
    }
  }, [isCopy]);

  return (
    <div>
      <Typography variant="body1" className={classes.addressText}>
        {truncateWalletAddr(address)}

        <CopyToClipboard text={address} onCopy={() => setCopy(true)}>
          <Tooltip
            title={isCopy ? t('common.copied') : t('common.copy-to-clipboard')}
            arrow
          >
            <IconButton size="small" className={classes.clipboardBtn}>
              {isCopy ? (
                <DoneIcon
                  className={classNames(
                    classes.clipboardBtnIcon,
                    classes.clipboardBtnIconDone,
                  )}
                />
              ) : (
                <CopyIcon className={classes.clipboardBtnIcon} />
              )}
            </IconButton>
          </Tooltip>
        </CopyToClipboard>
      </Typography>
    </div>
  );
};
