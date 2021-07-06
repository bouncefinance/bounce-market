import { IconButton } from '@material-ui/core';
import classNames from 'classnames';
import { CloseIcon } from 'modules/common/components/Icons/CloseIcon';
import {
  IVideoPlayerProps,
  VideoPlayer,
} from 'modules/common/components/VideoPlayer';
import React, { useRef, useState } from 'react';
import { PlayIcon } from './assets/PlayIcon';
import { useVideoStyles } from './useVideoStyles';

interface IVideoProps extends Omit<IVideoPlayerProps, 'controls'> {
  src: string;
}

export const VideoComponent = ({ className, ...playerProps }: IVideoProps) => {
  const classes = useVideoStyles();
  const [isOverlayActive, setOverlayActive] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onOverlayClick = () => {
    videoRef.current?.play();
    setOverlayActive(false);
  };

  const onCloseClick = () => {
    videoRef.current?.pause();
    setOverlayActive(true);
  };

  return (
    <div className={classNames(classes.root, className)}>
      <VideoPlayer
        {...playerProps}
        controls={!isOverlayActive}
        className={classNames(classes.absolute, classes.player)}
        ref={videoRef}
        objectFit="contain"
      />

      <div
        className={classNames(
          classes.absolute,
          classes.overlay,
          isOverlayActive && classes.overlayActive,
        )}
        onClick={onOverlayClick}
      >
        <PlayIcon className={classNames(classes.absolute, classes.playBtn)} />
      </div>

      <IconButton
        className={classNames(
          classes.closeBtn,
          !isOverlayActive && classes.closeBtnActive,
        )}
        onClick={onCloseClick}
      >
        <CloseIcon className={classes.closeIcon} />
      </IconButton>
    </div>
  );
};
