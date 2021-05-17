import { IconButton } from '@material-ui/core';
import { FacebookIcon } from 'modules/common/components/Icons/FacebookIcon';
import { InstagramIcon } from 'modules/common/components/Icons/InstagramIcon';
import { TwitterIcon } from 'modules/common/components/Icons/TwitterIcon';
import React from 'react';
import { uid } from 'react-uid';
import { useSocialStyles } from './useSocialStyles';
import { t } from 'modules/i18n/utils/intl';

interface ISocialProps {
  className?: string;
}

const items = [
  {
    title: t('social.twitter'),
    href: 'https://twitter.com/',
    icon: TwitterIcon,
  },
  {
    title: t('social.instagram'),
    href: 'https://www.instagram.com/',
    icon: InstagramIcon,
  },
  {
    title: t('social.facebook'),
    href: 'https://www.fb.com/',
    icon: FacebookIcon,
  },
];

export const Social = ({ className }: ISocialProps) => {
  const classes = useSocialStyles();

  return (
    <div className={className}>
      <ul className={classes.list}>
        {items.map(({ title, href, icon: Icon }, i) => (
          <li className={classes.item} key={uid(i)}>
            <IconButton href={href} target="_blank" title={title}>
              <Icon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};
