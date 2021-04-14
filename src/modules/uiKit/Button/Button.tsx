import { Button as ButtonComponent, ButtonProps } from '@material-ui/core';
import React from 'react';

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    submit?: boolean;
    style?: React.CSSProperties;
  }
>(({ variant = 'contained', submit, style, ...props }, ref) => (
  <ButtonComponent
    variant={variant}
    component="button"
    type={submit ? 'submit' : 'button'}
    ref={ref}
    style={style}
    {...props}
  />
));
