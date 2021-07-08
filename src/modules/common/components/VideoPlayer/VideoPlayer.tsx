import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { ObjectFitType } from '../../types/ObjectFit';
import { VideoErrorIcon } from './assets/VideoErrorIcon';
import { useVideoPlayerStyles } from './useVideoPlayerStyles';

export interface IVideoPlayerProps {
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
  controlsList?: string;
}

type VideoPlayerType =
  | (IVideoPlayerProps & {
      file: File;
    })
  | (IVideoPlayerProps & {
      src: string;
    });

export const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerType>(
  (
    {
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
      controlsList = 'nodownload',
      ...restProps
    },
    ref,
  ) => {
    const classes = useVideoPlayerStyles();

    const creatObjectUrlDestructor = useRef<any>();

    const video = useMemo(() => {
      function hasFile(data: any): data is { file: File } {
        return data.file;
      }
      return hasFile(restProps)
        ? (creatObjectUrlDestructor.current = URL.createObjectURL(
            restProps.file,
          ))
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

    return (
      <div
        className={classNames(
          classes.root,
          className,
          loadError && classes.rootError,
        )}
      >
        {loadError ? (
          <VideoErrorIcon className={classes.errorIcon} />
        ) : (
          <video
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
            ref={ref}
            controlsList={controlsList}
          >
            <source src={video} />
            {fallbackText}
          </video>
        )}
      </div>
    );
  },
);
