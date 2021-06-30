import { BrandRoutesConfig } from 'modules/brand/BrandRoutes';
import { DropsRoutesConfig } from 'modules/drops/Routes';
import { useLayout } from 'modules/layout/hooks/useLayout';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { Button } from 'modules/uiKit/Button';
import React, { useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { uid } from 'react-uid';
import { t } from '../../../i18n/utils/intl';
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
          <Button
            key={uid(label)}
            component={NavLink}
            to={href}
            href={href}
            variant="text"
            activeClassName={classes.activeLink}
            className={classes.link}
            onClick={onItemClick}
          >
            {label}
          </Button>
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
        label: t('header.drops'),
        href: DropsRoutesConfig.Drops.generatePath(),
      },
      {
        label: t('header.market'),
        href: MarketRoutesConfig.Market.generatePath(),
      },
      {
        label: t('header.brands'),
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
        label: t('header.how-it-works'),
        href: '/',
      },
    ],
    [],
  );

  return <HeaderLinksComponent items={items} onItemClick={onItemClick} />;
};
