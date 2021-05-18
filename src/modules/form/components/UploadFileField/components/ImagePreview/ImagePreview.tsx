import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useUploadFileStyles } from '../../useUploadFileStyles';
import { CropperBlock, ICropperBlockProps } from '../CropperBlock';

interface ICropperProps extends ICropperBlockProps {
  CropperPreviewComponent: any;
}
const renderCropper = ({
  CropperPreviewComponent,
  image,
  cropperAspect,
  cropHandle,
  needShowCropper,
}: ICropperProps) => {
  const CropperComponent = CropperPreviewComponent ?? CropperBlock;
  return (
    <CropperComponent
      image={image}
      cropperAspect={cropperAspect}
      cropHandle={cropHandle}
      needShowCropper={needShowCropper}
    />
  );
};

export interface IImagePreviewProps {
  image?: string;
  fitView?: boolean;
  cropper?: boolean;
  cropHandle: any;
  cropperAspect?: number;
  CropperPreviewComponent?: JSX.Element;
  needShowCropper: boolean;
}
export const ImagePreview = ({
  image,
  fitView,
  cropper,
  cropHandle,
  cropperAspect,
  CropperPreviewComponent,
  needShowCropper,
}: IImagePreviewProps) => {
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
    <>
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
      {cropper &&
        renderCropper({
          CropperPreviewComponent,
          image,
          cropperAspect,
          cropHandle,
          needShowCropper,
        })}
    </>
  );
};
