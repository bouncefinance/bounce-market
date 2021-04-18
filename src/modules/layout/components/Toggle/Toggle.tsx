import { Button, ButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { useToggleStyles } from './ToggleStyles';

interface IToggleProps extends ButtonProps {
  isActive?: boolean;
  className?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, IToggleProps>(
  ({ className, isActive, ...props }, ref) => {
    const classes = useToggleStyles();
    return (
      <Button
        className={classNames(
          classes.root,
          isActive && classes.active,
          className,
        )}
        ref={ref}
        variant="text"
        aria-label="open/close"
        {...props}
      >
        <i className={classNames(classes.line, classes.lineTop)} />
        <i className={classNames(classes.line, classes.lineBottom)} />
      </Button>
    );
  },
);
