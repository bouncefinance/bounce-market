import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@material-ui/core';
import { useRouteMatch } from 'react-router';

interface ILinkItemProps {
  label: string;
  href: string;
  classes: any;
}

export const HeaderLinkItem = ({ label, href, classes }: ILinkItemProps) => {
  const match = useRouteMatch(href);

  return (
    <Button
      component={RouterLink}
      to={href}
      href={href}
      variant="text"
      className={classNames(classes, match?.isExact && classes.activeLink)}
    >
      {label}
    </Button>
  );
};
