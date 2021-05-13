import { Button as ButtonComponent, ButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import { forwardRef } from 'react';
import { useButtonStyles } from './useButtonStyles';

interface IButtonProps extends ButtonProps {
  rounded?: boolean;
  [x: string]: any;
}

/**
 * The main api is here - [Button API](https://material-ui.com/api/button/)
 */
// TODO: fix typings
export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
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
