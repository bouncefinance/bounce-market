import React, { useEffect, useMemo, useRef, useState } from 'react';
import { t } from 'modules/i18n/utils/intl';
import { useVideoPlayerStyles } from './useVideoPlayerStyles';
import classNames from 'classnames';
import { ObjectFitType } from '../../types/ObjectFit';
import { useImgErrorStyles, VideoErrorIcon } from '../Icons/ImgError';

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
  playsInline?: boolean;
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
  playsInline = true,
  objectFit = 'fill',
  fallbackText = t('video-player.unsupported'),
  ...restProps
}: VideoPlayerType) => {
  const classes = useVideoPlayerStyles();

  const creatObjectUrlDestructor = useRef<any>();

  const video = useMemo(() => {
    function hasFile (data: any): data is { file: File } {
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

  const [loadError, setLoadError] = useState(false);
  const onError = () => setLoadError(true);
  const imgErrorClasses = useImgErrorStyles({ error: loadError });

  return (
    <div className={classNames(classes.root, className, imgErrorClasses.root)}>
      {loadError ?
        <VideoErrorIcon className={classNames(imgErrorClasses.img)} />
        : <video
          width={width}
          height={height}
          poster={poster}
          controls={controls}
          loop={loop}
          autoPlay={autoPlay}
          muted={muted}
          preload={preload}
          playsInline={playsInline}
          className={classNames(classes.player, classes[objectFit])}
          onError={onError}
        >
          <source src={video} />
          {fallbackText}
        </video>
      }
    </div>
  );
};
