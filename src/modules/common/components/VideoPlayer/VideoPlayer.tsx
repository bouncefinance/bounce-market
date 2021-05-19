import React, { useCallback } from 'react';
import { t } from 'modules/i18n/utils/intl';
import { uid } from 'react-uid';
import { useVideoPlayerStyles } from './useVideoPlayerStyles';
import classNames from 'classnames';
import { ObjectFitType } from '../../types/ObjectFit';

interface IVideoPlayerProps {
  file?: File;
  src?: string;
  className?: string;
  width?: number;
  height?: number;
  poster?: string;
  controls?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  preload?: string;
  objectFit?: ObjectFitType;
  fallbackText?: string;
}

export const VideoPlayer = ({
  file,
  src,
  className,
  width = 300,
  height = 300,
  poster,
  controls = true,
  loop = true,
  autoPlay = true,
  muted = true,
  preload = 'auto',
  objectFit = 'fill',
  fallbackText = t('video-player.unsupported'),
}: IVideoPlayerProps) => {
  const classes = useVideoPlayerStyles();

  const renderFile = useCallback(() => {
    if (file) {
      return <source src={URL.createObjectURL(file)} key={uid(file)} />;
    }
    return null;
  }, [file]);

  const renderSrc = useCallback(() => {
    if (src) {
      return <source src={src} key={uid(src)} />;
    }
    return null;
  }, [src]);

  return (
    <div className={classNames(classes.root, className)}>
      <video
        width={width}
        height={height}
        poster={poster}
        controls={controls}
        loop={loop}
        autoPlay={autoPlay}
        muted={muted}
        preload={preload}
        className={classNames(classes.player, classes[objectFit])}
      >
        {renderFile()}
        {renderSrc()}
        {fallbackText}
      </video>
    </div>
  );
};
