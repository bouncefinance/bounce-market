import React, { useMemo } from 'react';
import { uid } from 'react-uid';
import { NavLink } from '../../../uiKit/NavLink';
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
        <NavLink key={uid(label)} href={href} className={classes.link}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export const HeaderLinks = () => {
  const items = useMemo(
    () => [
      {
        label: 'Market',
        href: '/',
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
