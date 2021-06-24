import classNames from 'classnames';
import { Button } from 'modules/uiKit/Button';
import React from 'react';
import { BscScanIcon } from './assets/BscScanIcon';
import { useBSCScanBtnStyles } from './useBSCScanBtnStyles';

interface IBSCScanBtnProps {
  className?: string;
  href: string;
}

export const BSCScanBtn = ({ className, href }: IBSCScanBtnProps) => {
  const classes = useBSCScanBtnStyles();

  return (
    <Button
      className={classNames(classes.root, className)}
      component="a"
      href={href}
      variant="outlined"
      fullWidth
    >
      <BscScanIcon className={classes.icon} />
      View on BscScan
    </Button>
  );
};
