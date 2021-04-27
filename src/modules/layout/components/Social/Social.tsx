import { Box, BoxProps, IconButton } from '@material-ui/core';
import { TwitterIcon } from 'modules/common/components/Icons/TwitterIcon';
import React, { useMemo } from 'react';
import { uid } from 'react-uid';
import { MediumIcon } from './assets/MediumIcon';
import { TelegramIcon } from './assets/TelegramIcon';
import { useSocialStyles } from './SocialStyles';

export const Social = (props: BoxProps) => {
  const classes = useSocialStyles();

  const links = useMemo(
    () => [
      {
        title: 'Medium',
        icon: MediumIcon,
        href: 'https://bouncefinance.medium.com',
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
    <Box {...props} component="nav">
      <ul className={classes.list}>
        {links.map(({ title, href, icon: Icon }) => {
          return (
            <li className={classes.listItem} key={uid(title)}>
              <IconButton
                component="a"
                href={href}
                role="link"
                rel="noopener noreferrer"
                target="_blank"
                className={classes.link}
                {...(props as any)}
              >
                <Icon className={classes.icon} />
              </IconButton>
            </li>
          );
        })}
      </ul>
    </Box>
  );
};
