import classNames from 'classnames';
import { ProductCardCategoryType } from 'modules/common/components/ProductCard';
import { VideoPlayer } from 'modules/common/components/VideoPlayer';
import { IImgProps, Img } from 'modules/uiKit/Img';
import React from 'react';
import Truncate from 'react-truncate';
import { usePromoThumbStyles } from './PromoThumbStyles';

export type PromoThumbProps = {
  className?: string;
  img?: string;
  title: string;
  MediaProps: IImgProps & {
    category: ProductCardCategoryType;
  };
};

export const PromoThumb = ({
  img,
  title,
  className,
  MediaProps,
}: PromoThumbProps) => {
  const classes = usePromoThumbStyles();

  return (
    <div className={classNames(classes.root, className)}>
      {MediaProps.category === 'image' ? (
        <Img
          src={img}
          ratio="1x1"
          className={classes.imgWrap}
          loading="lazy"
          objectFit="contain"
        />
      ) : (
        <div className={classes.videoWrapper}>
          <div className={classes.video}>
            {MediaProps.src && (
              <VideoPlayer
                src={MediaProps.src}
                objectFit={MediaProps.objectFit}
              />
            )}
          </div>
        </div>
      )}

      <div className={classes.title} title={title}>
        <Truncate lines={3}>{title}</Truncate>
      </div>
    </div>
  );
};
