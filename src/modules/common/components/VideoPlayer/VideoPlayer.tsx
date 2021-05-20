import React, { useEffect } from 'react';
import { t } from 'modules/i18n/utils/intl';
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

  let isObjectUrl = false;
  let video: string;
  if (file) {
    isObjectUrl = true;
    video = URL.createObjectURL(file);
  } else if (src) {
    video = src;
  } else {
    throw new Error('No video');
  }

  useEffect(() => {
    return () => {
      if (isObjectUrl) {
        URL.revokeObjectURL(video);
      }
    };
  });

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
        <source src={video} />
        {fallbackText}
      </video>
    </div>
  );
};
