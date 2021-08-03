import classNames from 'classnames';
import React, { useState } from 'react';
import { ObjectFitType } from '../../common/types/ObjectFit';
import { ImgErrorIcon } from './assets/ImgErrorIcon';
import { useImgStyles } from './ImgStyles';

export interface IImgProps {
  src?: string;
  srcset?: {
    mobile?: string;
    mobile2x?: string;
    tablet?: string;
    tablet2x?: string;
    desktop: string;
    desktop2x?: string;
  };
  tabletBreakpoint?: string;
  desktopBreakpoint?: string;
  ratio?: '1x1' | '2x1' | '3x2' | '4x3' | '14x9' | '16x9';
  style?: React.CSSProperties;
  className?: string;
  imgClassName?: string;
  objectFit?: ObjectFitType;
  alt?: string;
  title?: string;
  isNativeLazyLoading?: boolean;
  loading?: 'eager' | 'lazy';
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Img = ({
  className,
  imgClassName,
  src,
  srcset,
  objectFit = 'cover',
  alt = '',
  title,
  style,
  loading,
  ratio = '3x2',
  tabletBreakpoint = '768px',
  desktopBreakpoint = '1200px',
  isNativeLazyLoading = true,
  onClick,
}: IImgProps) => {
  const classes = useImgStyles({ objectFit, ratio });
  const [loadError, setLoadError] = useState(false);
  const onError = () => setLoadError(true);

  let desktop, desktop2x, tablet, tablet2x, mobile, mobile2x;
  if (typeof srcset === 'object') {
    desktop = srcset.desktop;
    desktop2x = srcset.desktop2x;
    tablet = srcset.tablet;
    tablet2x = srcset.tablet2x;
    mobile = srcset.mobile;
    mobile2x = srcset.mobile2x;
  }
  const desktopSrcSet = desktop2x ? `${desktop}, ${desktop2x} 2x` : desktop;
  const tabletSrcSet = tablet2x ? `${tablet}, ${tablet2x} 2x` : tablet;
  const mobileSrcSet = mobile2x ? `${mobile}, ${mobile2x} 2x` : mobile;
  const imgSrc = desktop || src;

  const isPicture = tablet || mobile || desktop2x;

  const Component = isPicture ? 'picture' : 'div';

  const render = (
    <Component
      className={classNames(
        classes.root,
        className,
        loadError && classes.rootError,
      )}
      style={style}
      onClick={onClick}
    >
      {isPicture && (
        <source
          srcSet={isNativeLazyLoading ? desktopSrcSet : undefined}
          data-srcset={isNativeLazyLoading ? undefined : desktopSrcSet}
          media={`(min-width: ${desktopBreakpoint})`}
        />
      )}
      {tablet && (
        <source
          srcSet={isNativeLazyLoading ? tabletSrcSet : undefined}
          data-srcset={isNativeLazyLoading ? undefined : tabletSrcSet}
          media={`(min-width: ${tabletBreakpoint})`}
        />
      )}
      {mobile && (
        <source
          srcSet={isNativeLazyLoading ? mobileSrcSet : undefined}
          data-srcset={isNativeLazyLoading ? undefined : mobileSrcSet}
        />
      )}
      {loadError ? (
        <ImgErrorIcon className={classes.errorIcon} />
      ) : (
        <img
          src={isNativeLazyLoading ? imgSrc : undefined}
          data-src={isNativeLazyLoading ? undefined : imgSrc}
          alt={alt}
          title={title}
          loading={isNativeLazyLoading ? loading : undefined}
          className={classNames(classes.img, imgClassName)}
          onError={onError}
        />
      )}
    </Component>
  );

  // return imgSrc ? render : null;
  return render;
};
