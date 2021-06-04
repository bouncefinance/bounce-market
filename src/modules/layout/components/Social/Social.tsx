import { Box, BoxProps, IconButton } from '@material-ui/core';
import { TwitterIcon } from 'modules/common/components/Icons/TwitterIcon';
import React, { useMemo } from 'react';
import { uid } from 'react-uid';
import { MediumIcon } from 'modules/common/components/Icons/MediumIcon';
import { useSocialStyles } from './SocialStyles';
import { InstagramIcon } from '../../../common/components/Icons/InstagramIcon';
import { DiscordIcon } from '../../../common/components/Icons/DiscordIcon';

export const Social = (props: BoxProps) => {
  const classes = useSocialStyles();

  const links = useMemo(
    () => [
      {
        title: 'Medium',
        icon: MediumIcon,
        href: 'https://fangible.medium.com',
      },
      {
        title: 'Twitter',
        icon: TwitterIcon,
        href: 'https://twitter.com/Fangible_',
      },
      {
        title: 'Instagram',
        icon: InstagramIcon,
        href: 'https://instagram.com/fangible',
      },
      {
        title: 'Discord',
        icon: DiscordIcon,
        href: 'https://discord.gg/96K94raRKZ',
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
