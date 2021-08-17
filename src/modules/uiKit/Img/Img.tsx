import classNames from 'classnames';
import React from 'react';
import { ObjectFitType } from '../../common/types/ObjectFit';
import { ImgErrorIcon } from './assets/ImgErrorIcon';
import { useImgStyles } from './ImgStyles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useCdnUrl from 'modules/common/hooks/useCdnUrl';
import { memo } from 'react';

export interface IImgProps {
  src?: string;
  width?: number;
  height?: number;
  size?: 'small' | 'middle' | 'large';
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

export const Img = memo(
  ({
    className,
    imgClassName,
    src,
    width,
    height,
    size,
    objectFit = 'cover',
    alt = '',
    title,
    style,
    loading,
    ratio = '3x2',
    isNativeLazyLoading = true,
    onClick,
  }: IImgProps) => {
    const classes = useImgStyles({ objectFit, ratio });

    const useMaxWidth = () => {
      const theme = useTheme();

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
      const smallerThanSm = useMediaQuery(theme.breakpoints.down('sm'));
      const smallerThanMd = useMediaQuery(theme.breakpoints.down('md'));
      const smallerThanLg = useMediaQuery(theme.breakpoints.down('lg'));
      const largerThanLg = useMediaQuery(theme.breakpoints.up('lg'));

      if (size === 'small') return 160;
      if (size === 'middle') return 400;
      if (size === 'large') return 560;

      if (smallerThanSm) return 560;
      if (smallerThanMd) return 400;
      if (smallerThanLg) return 300;
      if (largerThanLg) return 400;
      return 400;
    };

    const maxWidth = useMaxWidth();

    const { imgSrc, setImgSrc } = useCdnUrl(
      src || '',
      width || maxWidth,
      height,
    );

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
  },
);
