import { Button, ButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import React, { MutableRefObject } from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

type NavLinksVariant = 'contained' | 'outlined' | 'text';

export interface INavLinkProps {
  component?: string | React.ComponentType;
  href: string;
  variant?: NavLinksVariant;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  activeClassName?: string;
  exactMatch?: boolean;
}

export const NavLink = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps & INavLinkProps
>(
  (
    {
      href,
      variant = 'text',
      onClick,
      activeClassName,
      className,
      exactMatch = false,
      ...props
    },
    ref,
  ) => {
    const isLink =
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('tel');

    const match = useRouteMatch({
      path: href,
      exact: exactMatch,
    });

    if (isLink) {
      return (
        <Button
          component="a"
          href={href}
          variant={variant}
          onClick={onClick}
          role="link"
          rel="noopener noreferrer"
          target="_blank"
          ref={ref as MutableRefObject<HTMLAnchorElement>}
          className={className}
          {...(props as any)}
        />
      );
    }

    return (
      <Button
        component={RouterLink as any}
        to={href}
        variant={variant}
        onClick={onClick}
        ref={ref}
        className={classNames(className, match && activeClassName)}
        {...props}
      />
    );
  },
);