import { RoutesConfiguration } from 'modules/overview/Routes';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoImg } from './assets/logo.svg';
import { useLogoByBounceStyles } from './useLogoByBounceStyles';

interface ILogoByBounceProps {
  className?: string;
}

export const LogoByBounce = ({ className }: ILogoByBounceProps) => {
  const classes = useLogoByBounceStyles();

  return (
    <Link
      to={RoutesConfiguration.Overview.generatePath()}
      className={classes.root}
    >
      <LogoImg className={classes.img} />
    </Link>
  );
};
