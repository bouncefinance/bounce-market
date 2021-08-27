import { Menu, MenuItem, MenuList } from '@material-ui/core';
import { FacebookIcon } from 'modules/common/components/Icons/FacebookIcon';
import { TelegramIcon } from 'modules/common/components/Icons/TelegramIcon';
import { TwitterIcon } from 'modules/common/components/Icons/TwitterIcon';
import { t } from 'modules/i18n/utils/intl';
import React, { useState } from 'react';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';
import { useSocialShareStyles } from './useSocialShareStyles';

interface ISocialShareProps {
  buttonContent: JSX.Element;
  url?: string;
  titleString?: string;
  description?: string;
}

export const SocialShare = ({
  buttonContent,
  url,
  titleString,
  description,
}: ISocialShareProps) => {
  const classes = useSocialShareStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  url = url ?? window.location.href;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let titleForSocial = '';
  if (titleString && description) {
    titleForSocial = t('social.title-for-socials', {
      title: titleString,
      description: description,
    });
  } else if (titleString) {
    titleForSocial = titleString;
  } else if (description) {
    titleForSocial = description;
  }

  const renderContent = (
    <MenuList>
      <MenuItem className={classes.menuItem} component="li">
        <TwitterShareButton
          resetButtonStyle={false}
          className={classes.menuButton}
          url={url}
          title={titleForSocial}
          hashtags={['Fangible', 'nft']}
          via={'Fangible_'}
          related={['@Fangible_']}
        >
          <TwitterIcon className={classes.menuIcon} />
          {t('social.twitter')}
        </TwitterShareButton>
      </MenuItem>

      <MenuItem className={classes.menuItem} component="li">
        <FacebookShareButton
          resetButtonStyle={false}
          className={classes.menuButton}
          url={url}
          quote={titleForSocial}
          hashtag="#Fangible"
        >
          <FacebookIcon className={classes.menuIcon} />
          {t('social.facebook')}
        </FacebookShareButton>
      </MenuItem>

      <MenuItem className={classes.menuItem} component="li">
        <TelegramShareButton
          resetButtonStyle={false}
          className={classes.menuButton}
          url={url}
          title={`${titleForSocial} \n#Fangible #nft`}
        >
          <TelegramIcon className={classes.menuIcon} />
          {t('social.telegram')}
        </TelegramShareButton>
      </MenuItem>
    </MenuList>
  );

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={{
        variant: 'outlined',
      }}
    >
      {renderContent}
    </Menu>
  );

  return (
    <>
      <div onClick={handleClick}>{buttonContent}</div>
      {renderMenu}
    </>
  );
};
