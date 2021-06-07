import React, { useEffect, useMemo, useRef } from 'react';
import { t } from 'modules/i18n/utils/intl';
import { useVideoPlayerStyles } from './useVideoPlayerStyles';
import classNames from 'classnames';
import { ObjectFitType } from '../../types/ObjectFit';

interface IVideoPlayerProps {
  className?: string;
  width?: number;
  height?: number;
  poster?: string;
  controls?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  objectFit?: ObjectFitType;
  fallbackText?: string;
}

type VideoPlayerType =
  | (IVideoPlayerProps & {
      file: File;
    })
  | (IVideoPlayerProps & {
      src: string;
    });

export const VideoPlayer = ({
  className,
  width = 300,
  height = 300,
  poster,
  controls = true,
  loop = true,
  autoPlay = false,
  muted = true,
  preload = 'metadata',
  objectFit = 'fill',
  fallbackText = t('video-player.unsupported'),
  ...restProps
}: VideoPlayerType) => {
  const classes = useVideoPlayerStyles();

  const creatObjectUrlDestructor = useRef<any>();

  const video = useMemo(() => {
    function hasFile(data: any): data is { file: File } {
      return data.file;
    }
    return hasFile(restProps)
      ? (creatObjectUrlDestructor.current = URL.createObjectURL(restProps.file))
      : restProps.src;
  }, [restProps]);

  useEffect(() => {
    return () => {
      if (creatObjectUrlDestructor.current) {
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
