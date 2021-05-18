import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import classNames from 'classnames';
import { useUploadFileStyles } from '../../useUploadFileStyles';
import { t } from 'modules/i18n/utils/intl';
import { IconButton, Tooltip } from '@material-ui/core';
import { CloseIcon } from 'modules/common/components/Icons/CloseIcon';
import { DoneIcon } from 'modules/common/components/Icons/DoneIcon';
import { RotateLeftIcon } from 'modules/common/components/Icons/RotateLeftIcon';
import { RotateRightIcon } from 'modules/common/components/Icons/RotateRightIcon';
import { FlipHorizontalIcon } from 'modules/common/components/Icons/FlipHorizontalIcon';
import { FlipVerticalIcon } from 'modules/common/components/Icons/FlipVerticalIcon';
import { RestoreIcon } from 'modules/common/components/Icons/RestoreIcon';

interface ICropperBlockProps {
  image: string;
  cropperAspect: number;
  cropHandle: any;
  needShowCropper: boolean;
}

export const CropperBlock = ({
  image,
  cropperAspect,
  cropHandle,
  needShowCropper,
}: ICropperBlockProps) => {
  const classes = useUploadFileStyles();

  const [cropperShow, setCropperShow] = useState<boolean>(false);
  const [cropper, setCropper] = useState<any>();

  const [flipV, setFlipV] = useState<number>(1);
  const [flipH, setFlipH] = useState<number>(1);

  const cropperRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCropperShow(!!image && needShowCropper);
  }, [image, needShowCropper]);

  const handleHide = useCallback(() => {
    setCropperShow(false);
  }, []);

  const handleApply = useCallback(() => {
    cropHandle(cropper.getCroppedCanvas().toDataURL());
    setCropperShow(false);
  }, [cropper, cropHandle]);

  const handleRotate = useCallback(
    degree => {
      cropper.rotate(degree);
    },
    [cropper],
  );

  const handleFlip = (horizontal: boolean) => {
    if (horizontal) {
      const newVal = flipH * -1;
      cropper.scaleX(newVal);
      setFlipH(newVal);
    } else {
      const newVal = flipV * -1;
      cropper.scaleY(newVal);
      setFlipV(newVal);
    }
  };

  const handleReset = useCallback(() => {
    cropper.reset();
  }, [cropper]);

  const renderCropperButtons = (
    <div className={classes.cropperBtns}>
      <Tooltip title={t('common.restore')} arrow>
        <IconButton
          onClick={handleReset}
          className={classNames(
            classes.cropperTransformBtn,
            classes.cropperTransformBtnRestore,
          )}
        >
          <RestoreIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('cropper.rotate-left')} arrow>
        <IconButton
          onClick={() => handleRotate(-90)}
          className={classes.cropperTransformBtn}
        >
          <RotateLeftIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('cropper.rotate-right')} arrow>
        <IconButton
          onClick={() => handleRotate(90)}
          className={classes.cropperTransformBtn}
        >
          <RotateRightIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('cropper.flip-h')} arrow>
        <IconButton
          onClick={() => handleFlip(true)}
          className={classes.cropperTransformBtn}
        >
          <FlipHorizontalIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('cropper.flip-v')} arrow>
        <IconButton
          onClick={() => handleFlip(false)}
          className={classes.cropperTransformBtn}
        >
          <FlipVerticalIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('common.apply')} arrow>
        <IconButton
          onClick={handleApply}
          className={classNames(
            classes.cropperTransformBtn,
            classes.cropperTransformBtnSave,
          )}
        >
          <DoneIcon />
        </IconButton>
      </Tooltip>
    </div>
  );

  return (
    <div
      className={classNames(
        classes.previewContainer,
        classes.previewContainerCropper,
        cropperShow && classes.previewContainerCropperShow,
      )}
    >
      <div className={classes.cropperContainer}>
        <Cropper
          src={image}
          style={{ height: '100%', width: '100%' }}
          initialAspectRatio={cropperAspect}
          aspectRatio={cropperAspect}
          guides={false}
          dragMode="move"
          viewMode={1}
          checkOrientation={false}
          ref={cropperRef}
          responsive={true}
          onInitialized={instance => {
            setCropper(instance);
          }}
        />
      </div>

      <Tooltip
        title={t('common.close')}
        className={classes.cropperCloseBtn}
        arrow
      >
        <IconButton onClick={handleHide}>
          <CloseIcon />
        </IconButton>
      </Tooltip>

      {renderCropperButtons}
    </div>
  );
};
