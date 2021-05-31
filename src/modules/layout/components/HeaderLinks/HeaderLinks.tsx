import { BrandRoutesConfig } from 'modules/brand/BrandRoutes';
import { MarketRoutesConfig } from 'modules/market/Routes';
import React, { useMemo } from 'react';
import { uid } from 'react-uid';
import { useHeaderLinksStyles } from './HeaderLinksStyles';
import { HeaderLinkItem } from './HeaderLinkItem';

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
        return (
          <HeaderLinkItem
            label={label}
            href={href}
            classes={classes}
            key={uid(label)}
          />
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
