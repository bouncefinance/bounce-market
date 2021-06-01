import { Button } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';
import { useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

interface ILinkItemProps {
  label: string;
  href: string;
  classes: ClassNameMap<string>;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const HeaderLinkItem = ({
  label,
  href,
  classes,
  onClick,
}: ILinkItemProps) => {
  const match = useRouteMatch(href);

  return (
    <Button
      component={RouterLink}
      to={href}
      href={href}
      variant="text"
      className={classNames(classes, match?.isExact && classes.activeLink)}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
