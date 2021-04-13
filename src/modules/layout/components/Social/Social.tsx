import React, { useMemo } from 'react';
import { uid } from 'react-uid';
import { NavLink } from '../../../uiKit/NavLink';
import { MonogramIcon } from './assets/MonogramIcon';
import { TelegramIcon } from './assets/TelegramIcon';
import { TwitterIcon } from './assets/TwitterIcon';
import { useSocialStyles } from './SocialStyles';

export const Social = () => {
  const classes = useSocialStyles();

  const links = useMemo(
    () => [
      {
        title: 'Monogram',
        icon: MonogramIcon,
        href: 'https://www.google.com/search?q=monogram',
      },
      {
        title: 'Twitter',
        icon: TwitterIcon,
        href: 'https://twitter.com',
      },
      {
        title: 'Telegram',
        icon: TelegramIcon,
        href: 'https://t.me',
      },
    ],
    [],
  );

  return (
    <nav className={classes.root}>
      <ul className={classes.list}>
        {links.map(({ title, href, icon: Icon }) => {
          return (
            <li className={classes.listItem} key={uid(title)}>
              <NavLink href={href} className={classes.link}>
                <Icon className={classes.icon} />
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
