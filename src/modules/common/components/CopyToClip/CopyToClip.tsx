import { IconButton, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import { CopyIcon } from 'modules/common/components/Icons/CopyIcon';
import { DoneIcon } from 'modules/common/components/Icons/DoneIcon';
import CopyToClipboard from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme: Theme) => ({
  addressText: {
    color: theme.palette.text.secondary,
    fontSize: 14,
  },
  clipboardBtn: {
    fontSize: 20,
    border: 'none !important',
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  clipboardBtnIcon: {
    fontSize: 'inherit',
  },
  clipboardBtnIconDone: {
    color: theme.palette.success.light,
  },
}))

export const CopyToClicp = ({
  address,
}: {
  address: string;
}) => {
  const classes = useStyles();
  const [isCopy, setCopy] = useState<boolean>(false);

  useEffect(() => {
    if (isCopy) {
      setTimeout(() => {
        setCopy(false);
        (document.activeElement as any)?.blur();
      }, 1000);
    }
  }, [isCopy]);

  return <div>
    <Typography variant="body1" className={classes.addressText}>
      {truncateWalletAddr(address)}

      <CopyToClipboard text={address} onCopy={() => setCopy(true)}>
        <Tooltip
          title={
            isCopy ? t('common.copied') : t('common.copy-to-clipboard')
          }
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
}