import { Container } from '@material-ui/core';
import classNames from 'classnames';
import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import { SocialShare } from 'modules/common/components/SocialShare';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import React from 'react';
import { VideoPlayer } from '../../../common/components/VideoPlayer';
import { LikeBtn } from '../LikeBtn';
import { useMediaContainerStyles } from './useMediaContainerStyles';

interface INFTContentProps {
  className?: string;
  src: string;
  title: string;
  description: string;
  isLiked?: boolean;
  category: 'image' | 'video';
  onLikeClick?: () => void;
}

export const MediaContainer = ({
  className,
  src,
  title,
  description,
  category,
  isLiked,
  onLikeClick,
}: INFTContentProps) => {
  const classes = useMediaContainerStyles();

  return (
    <Container className={classNames(classes.root, className)}>
      <div className={classes.content}>
        {category === 'image' ? (
          <img className={classes.img} src={src} loading="lazy" alt="" />
        ) : (
          <VideoPlayer src={src} autoPlay />
        )}

        <div className={classes.actions}>
          {featuresConfig.nftLikes && <LikeBtn className={classes.btn} />}

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
