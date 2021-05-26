import React from 'react';
import classNames from 'classnames';
import { useUploadFileStyles } from '../../useUploadFileStyles';
import { VideoPlayer } from 'modules/common/components/VideoPlayer';

export interface IVideoPreviewProps {
  file: File;
}

export const VideoPreview = ({ file }: IVideoPreviewProps) => {
  const classes = useUploadFileStyles();

  return (
    <div
      className={classNames(
        classes.previewContainer,
        classes.previewContainerVideo,
      )}
    >
      <VideoPlayer file={file} objectFit="cover" autoPlay controls />
    </div>
  );
};
