import { IconButton } from '@material-ui/core';
import { FacebookIcon } from 'modules/common/components/Icons/FacebookIcon';
import { InstagramIcon } from 'modules/common/components/Icons/InstagramIcon';
import { TwitterIcon } from 'modules/common/components/Icons/TwitterIcon';
import React from 'react';
import { uid } from 'react-uid';
import { useSocialStyles } from './useSocialStyles';
import { t } from 'modules/i18n/utils/intl';
import { IProfileInfo } from 'modules/profile/api/profileInfo';

interface ISocialProps {
  className?: string;
  profileInfo?: IProfileInfo | null;
}

export const Social = ({ className, profileInfo }: ISocialProps) => {
  const classes = useSocialStyles();

  const items = [
    {
      title: t('social.twitter'),
      href: profileInfo?.twitter,
      icon: TwitterIcon,
    },
    {
      title: t('social.instagram'),
      href: profileInfo?.instagram,
      icon: InstagramIcon,
    },
    {
      title: t('social.facebook'),
      href: profileInfo?.facebook,
      icon: FacebookIcon,
    },
  ].filter(item => item.href);

  return (
    <div className={className}>
      <ul className={classes.list}>
        {items.map(({ title, href, icon: Icon }, i) => (
          <li className={classes.item} key={uid(i)}>
            <IconButton href={href as string} target="_blank" title={title}>
              <Icon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};
