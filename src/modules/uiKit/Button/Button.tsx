import { Button as ButtonComponent } from '@material-ui/core';
import classNames from 'classnames';
import { forwardRef } from 'react';
import { useButtonStyles } from './useButtonStyles';

/**
 * The main api is here - [Button API](https://material-ui.com/api/button/)
 */
// todo: fix typings
export const Button = forwardRef<HTMLButtonElement, any>(
  ({ rounded = false, className, ...props }, ref) => {
    const classes = useButtonStyles();
    return (
      <ButtonComponent
        ref={ref}
        className={classNames(className, rounded && classes.rounded)}
        {...props}
      />
    );
  },
);
