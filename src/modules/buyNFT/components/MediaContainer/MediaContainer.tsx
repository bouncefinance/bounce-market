import { Container } from '@material-ui/core';
import classNames from 'classnames';
import { HeartIcon } from 'modules/common/components/Icons/HeartIcon';
import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import { SocialShare } from 'modules/common/components/SocialShare';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import React from 'react';
import { VideoPlayer } from '../../../common/components/VideoPlayer';
import { useMediaContainerStyles } from './useMediaContainerStyles';

interface INFTContentProps {
  className?: string;
  src: string;
  title: string;
  description: string;
  category: 'image' | 'video';
}

export const MediaContainer = ({
  className,
  src,
  title,
  description,
  category,
}: INFTContentProps) => {
  const classes = useMediaContainerStyles();

  return (
    <Container className={classNames(classes.root, className)}>
      <div className={classes.content}>
        {category === 'image' ? (
          <img className={classes.img} src={src} loading="lazy" alt="" />
        ) : (
          <VideoPlayer src={src} />
        )}

        <div className={classes.actions}>
          {featuresConfig.nftLikes && (
            <Button variant="outlined" className={classes.btn} rounded>
              <HeartIcon className={classes.btnIcon} /> 150
            </Button>
          )}

          <SocialShare
            titleString={title}
            description={description}
            buttonContent={
              <Button variant="outlined" className={classes.btn} rounded>
                <ShareIcon className={classes.btnIcon} /> {t('social.share')}
              </Button>
            }
          />
        </div>
      </div>
    </Container>
  );
};
