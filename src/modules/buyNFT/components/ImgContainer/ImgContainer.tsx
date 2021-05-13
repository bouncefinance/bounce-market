import { Container, MenuItem, MenuList, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import { FacebookIcon } from 'modules/common/components/Icons/FacebookIcon';
import { HeartIcon } from 'modules/common/components/Icons/HeartIcon';
import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import { TwitterIcon } from 'modules/common/components/Icons/TwitterIcon';
import { Button } from 'modules/uiKit/Button';
import { useImgContainerStyles } from './useImgContainerStyles';
import { t } from 'modules/i18n/utils/intl';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';
import { TelegramIcon } from 'modules/common/components/Icons/TelegramIcon';

interface INFTContentProps {
  className?: string;
  src: string;
  title: string;
  description: string;
}

const currentUrl = window.location.href;

export const ImgContainer = ({
  className,
  src,
  title,
  description,
}: INFTContentProps) => {
  const classes = useImgContainerStyles();

  let titleForSocial = '';
  if (title && description) {
    titleForSocial = t('social.title-for-socials', {
      title: title,
      description: description,
    });
  } else if (title) {
    titleForSocial = title;
  } else if (description) {
    titleForSocial = description;
  }

  const renderedTooltipContent = (
    <MenuList>
      <MenuItem className={classes.tooltipItem} component="li">
        <TwitterShareButton
          resetButtonStyle={false}
          className={classes.tooltipButton}
          url={currentUrl}
          title={titleForSocial}
          hashtags={['Fangible', 'nft']}
          via={'Fangible'}
          related={['@Fangible_']}
        >
          <TwitterIcon className={classes.tooltipIcon} />
          Twitter
        </TwitterShareButton>
      </MenuItem>

      <MenuItem className={classes.tooltipItem} component="li">
        <FacebookShareButton
          resetButtonStyle={false}
          className={classes.tooltipButton}
          url={currentUrl}
          quote={titleForSocial}
          hashtag="#Fangible"
        >
          <FacebookIcon className={classes.tooltipIcon} />
          Facebook
        </FacebookShareButton>
      </MenuItem>

      <MenuItem className={classes.tooltipItem} component="li">
        <TelegramShareButton
          resetButtonStyle={false}
          className={classes.tooltipButton}
          url={currentUrl}
          title={`${titleForSocial} \n#Fangible #nft`}
        >
          <TelegramIcon className={classes.tooltipIcon} />
          Telegram
        </TelegramShareButton>
      </MenuItem>
    </MenuList>
  );

  return (
    <Container className={classNames(classes.root, className)}>
      <div className={classes.content}>
        <img className={classes.img} src={src} loading="lazy" alt="" />

        <div className={classes.actions}>
          <Button variant="outlined" className={classes.btn} rounded>
            <HeartIcon className={classes.btnIcon} /> 150
          </Button>

          <Tooltip
            classes={{
              tooltip: classes.tooltip,
            }}
            title={renderedTooltipContent}
            placement="bottom-start"
            enterTouchDelay={0}
            leaveDelay={500}
            leaveTouchDelay={1000 * 60}
            interactive
          >
            <Button variant="outlined" className={classes.btn} rounded>
              <ShareIcon className={classes.btnIcon} /> {t('social.share')}
            </Button>
          </Tooltip>
        </div>
      </div>
    </Container>
  );
};
