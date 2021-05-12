import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useUploadFileStyles } from '../../useUploadFileStyles';

interface IImagePreviewProps {
  image: string;
  fitView: boolean;
}

export const ImagePreview = ({ image, fitView }: IImagePreviewProps) => {
  const classes = useUploadFileStyles();

  const getImagePreviewClasses = useCallback(() => {
    if (fitView) {
      return classNames(
        classes.previewUploadedImage,
        classes.previewUploadedImageFit,
      );
    }
    return classes.previewUploadedImage;
  }, [fitView, classes.previewUploadedImage, classes.previewUploadedImageFit]);

  return (
    <div
      className={classNames(
        classes.previewContainer,
        classes.previewContainerImage,
      )}
    >
      <div
        className={getImagePreviewClasses()}
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
};
