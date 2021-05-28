import { Button } from '@material-ui/core';
import { BrandRoutesConfig } from 'modules/brand/BrandRoutes';
import { MarketRoutesConfig } from 'modules/market/Routes';
import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { uid } from 'react-uid';
import { useHeaderLinksStyles } from './HeaderLinksStyles';
import classNames from 'classnames';
import { matchPath } from 'react-router';

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
      {items.map(({ label, href }) => {
        const match = matchPath(window.location.pathname, {
          path: href,
          exact: true,
          strict: false,
        });

        return (
          <Button
            component={RouterLink}
            to={href}
            key={uid(label)}
            href={href}
            variant="text"
            className={classNames(
              classes.link,
              match?.isExact && classes.activeLink,
            )}
          >
            {label}
          </Button>
        );
      })}
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
        href: BrandRoutesConfig.ListBrand.generatePath(),
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
