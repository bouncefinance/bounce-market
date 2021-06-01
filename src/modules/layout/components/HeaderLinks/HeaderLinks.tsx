import { BrandRoutesConfig } from 'modules/brand/BrandRoutes';
import { useLayout } from 'modules/layout/hooks/useLayout';
import { MarketRoutesConfig } from 'modules/market/Routes';
import React, { useCallback, useMemo } from 'react';
import { uid } from 'react-uid';
import { HeaderLinkItem } from './HeaderLinkItem';
import { useHeaderLinksStyles } from './HeaderLinksStyles';

const useHeaderLinks = () => {
  const { toggleNav, mobileNavShowed } = useLayout();

  const onItemClick = useCallback(() => {
    if (mobileNavShowed) {
      toggleNav(false);
    }
  }, [mobileNavShowed, toggleNav]);
  return { onItemClick };
};

interface IHeaderLinksProps {
  items: {
    label: string;
    href: string;
  }[];
  onItemClick?: () => void;
}

export const HeaderLinksComponent = ({
  items,
  onItemClick,
}: IHeaderLinksProps) => {
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
            onClick={onItemClick}
          />
        );
      })}
    </nav>
  );
};

export const HeaderLinks = () => {
  const { onItemClick } = useHeaderLinks();
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

  return <HeaderLinksComponent items={items} onItemClick={onItemClick} />;
};

export const HeaderLinksSecondary = () => {
  const { onItemClick } = useHeaderLinks();
  const items = useMemo(
    () => [
      {
        label: 'How it works',
        href: '/',
      },
    ],
    [],
  );

  return <HeaderLinksComponent items={items} onItemClick={onItemClick} />;
};
