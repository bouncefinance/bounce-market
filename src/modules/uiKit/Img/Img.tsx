import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { ObjectFitType } from '../../common/types/ObjectFit';
import { ImgErrorIcon } from './assets/ImgErrorIcon';
import { useImgStyles } from './ImgStyles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useCdnUrl } from '../../common/hooks/useCdnUrl';

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
  /* 
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    HD: 1366,
    WXGAPlus: 1440,
    HDPlus: 1600,
  */

  const theme = useTheme();
  const smallerThanSm = useMediaQuery(theme.breakpoints.down('sm'));
  const smallerThanMd = useMediaQuery(theme.breakpoints.down('md'));
  const smallerThanLg = useMediaQuery(theme.breakpoints.down('lg'));
  const largerThanLg = useMediaQuery(theme.breakpoints.up('lg'));
  const getMaxWidth = () => {
    if (smallerThanSm) return 450;
    if (smallerThanMd) return 360;
    if (smallerThanLg) return 300;
    if (largerThanLg) return 270;
    return 400;
  };

  const getCdnUrl = (
    src: string,
    width: number = 0,
    height: number = 0,
  ): string => {
    const cdnUrl = 'https://ap1-cfs3-media-bounce.bounce.finance/';
    const suffixs = ['.jpg', '.png', '.gif', '.jp2', '.jpeg'];

    const hasThumbnail =
      src.slice(0, cdnUrl.length) === cdnUrl &&
      suffixs.find(format => src.slice(-5)?.includes(format));

    const getThumbnailUrl = (src: String): string => {
      return `${cdnUrl}${width || 'auto'}x${height || 'auto'}/${src?.replace(
        cdnUrl,
        '',
      )}`;
    };

    return hasThumbnail ? getThumbnailUrl(src) : src;
  };

  const [imgSrc, setImgSrc] = useState<string>('');

  const preLoad = (src: string, origin: string, reload?: boolean) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      if (!reload && src.slice(-5)?.includes('.gif')) {
        requestAnimationFrame(() => preLoad(origin, origin, true));
      }
    };
    img.onerror = () => setImgSrc('');
  };

  useEffect(() => {
    if (src) {
      preLoad(getCdnUrl(src, getMaxWidth()), src);
    }
  }, [src]);

  // const imgSrc = useCdnUrl(src, getMaxWidth())

  setImgSrc(useCdnUrl(src || '', getMaxWidth()));

  const render = (
    <div
      className={classNames(classes.root, className)}
      style={style}
      onClick={onClick}
    >
      <img
        src={imgSrc as string}
        data-src={isNativeLazyLoading ? undefined : imgSrc}
        alt={alt}
        title={title}
        loading={isNativeLazyLoading ? loading : undefined}
        className={classNames(classes.img, imgClassName)}
        onError={() => setImgSrc('')}
      />
      {imgSrc === '' && (
        <div className={classes.errorIcon}>
          <ImgErrorIcon />
        </div>
      )}
    </div>
  );
  return render;
};
