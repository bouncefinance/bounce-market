import { Box, Container, Grid } from '@material-ui/core';
import classNames from 'classnames';
import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import CardPutSaleTimer from 'modules/common/components/ProductCard/putsaleTimer';
import { SocialShare } from 'modules/common/components/SocialShare';
import { t } from 'modules/i18n/utils/intl';
import { GoBack } from 'modules/layout/components/GoBack';
import { Button } from 'modules/uiKit/Button';
import React from 'react';
import { VideoPlayer } from '../../../common/components/VideoPlayer';
import { useMediaContainerStyles } from './useMediaContainerStyles';

interface INFTContentProps {
  className?: string;
  src: string;
  title: string;
  description: string;
  isLiked?: boolean;
  category: 'image' | 'video';
  onLikeClick?: () => void;
  isOpenSaleTime: boolean;
  openAt?: Date;
  onchange: () => void;
  LikeBtn: JSX.Element;
}

export const MediaContainer = ({
  className,
  src,
  title,
  description,
  category,
  isLiked,
  onLikeClick,
  isOpenSaleTime,
  openAt = new Date(0),
  onchange,
  LikeBtn,
}: INFTContentProps) => {
  const classes = useMediaContainerStyles();

  return (
    <Container className={classNames(classes.root, className)}>
      <Box mb={3}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs>
            <GoBack />
          </Grid>

          <Grid item>
            <Box display="flex" alignItems="center">
              <SocialShare
                titleString={title}
                description={description}
                buttonContent={
                  <Button variant="outlined" className={classes.btn} rounded>
                    <ShareIcon className={classes.btnIcon} />{' '}
                    {t('social.share')}
                  </Button>
                }
              />
              {LikeBtn}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <div className={classes.content}>
        {category === 'image' ? (
          <img className={classes.img} src={src} loading="lazy" alt="" />
        ) : (
          <VideoPlayer src={src} autoPlay />
        )}

        {isOpenSaleTime && (
          <CardPutSaleTimer onchange={onchange} openAt={openAt} />
        )}
      </div>
    </Container>
  );
};
