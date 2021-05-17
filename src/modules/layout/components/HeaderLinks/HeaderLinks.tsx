import { Button } from '@material-ui/core';
import { MarketRoutesConfig } from 'modules/market/Routes';
import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { uid } from 'react-uid';
import { useHeaderLinksStyles } from './HeaderLinksStyles';

interface IHeaderLinksProps {
  items: {
    label: string;
    href: string;
  }[];
}

export const HeaderLinksComponent = ({ items }: IHeaderLinksProps) => {
  const classes = useHeaderLinksStyles();

  return (
    <nav className={classes.root}>
      {items.map(({ label, href }) => (
        <Button
          component={RouterLink}
          to={href}
          key={uid(label)}
          href={href}
          variant="text"
          className={classes.link}
        >
          {label}
        </Button>
      ))}
    </nav>
  );
};

export const HeaderLinks = () => {
  const items = useMemo(
    () => [
      {
        label: 'Market',
        href: MarketRoutesConfig.Market.generatePath(),
      },
      {
        label: 'Brands',
        href: '/',
      },
    ],
    [],
  );

  return <HeaderLinksComponent items={items} />;
};

export const HeaderLinksSecondary = () => {
  const items = useMemo(
    () => [
      {
        label: 'How it works',
        href: '/',
      },
    ],
    [],
  );

  return <HeaderLinksComponent items={items} />;
};
