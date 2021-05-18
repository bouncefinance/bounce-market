import { FormHelperText, InputLabel, TextFieldProps } from '@material-ui/core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { getErrorText } from '../../utils/getErrorText';
import { readImage } from '../../utils/readImage';
import { useUploadFileStyles } from './useUploadFileStyles';
import {
  IMAGE_FILES_MIMES,
  VIDEO_FILES_MIMES,
  AUDIO_FILES_MIMES,
} from 'modules/common/utils/mimeTypes';

import { InitialBlock } from './components/InitialBlock';
import { FilePreview } from './components/FilePreview';
import { ImagePreview } from './components/ImagePreview';
import { VideoPreview } from './components/VideoPreview';
import { AudioPreview } from './components/AudioPreview';
import { UploadedWrap } from './components/UploadedWrap';
import { Bytes } from 'modules/common/types/unit';
import { dataUrlToFile } from '../../utils/dataUrlConvert';
import classNames from 'classnames';

// TODO: need to fix 'any' typings (here and in the child components)

const MAX_SIZE: Bytes = 31457280;

const renderInitialBlock = (
  InitialBlockComponent: any,
  input: JSX.Element,
  acceptsHint: string[] | undefined,
  maxSize: Bytes,
) => {
  if (InitialBlockComponent) {
    return (
      <InitialBlockComponent
        input={input}
        acceptsHint={acceptsHint}
        maxSize={maxSize}
      />
    );
  }
  return (
    <InitialBlock input={input} acceptsHint={acceptsHint} maxSize={maxSize} />
  );
};

const renderUploadedWrapPreview = (
  UploadedWrapComponent: any,
  input: JSX.Element,
  cover: JSX.Element | null,
  handleReset: () => void,
): any => {
  const UploadedWrapper = UploadedWrapComponent ?? UploadedWrap;
  return (
    <UploadedWrapper input={input} cover={cover} handleReset={handleReset} />
  );
};

const renderFilePreview = (
  FilePreviewComponent: any,
  fileName: string,
  fileSize: number,
) => {
  const FileComponent = FilePreviewComponent ?? FilePreview;
  return <FileComponent fileName={fileName} fileSize={fileSize} />;
};

const renderImagePreview = (
  ImagePreviewComponent: any,
  image: string | undefined,
  fitView: boolean | undefined,
  cropper: boolean | undefined,
  cropHandle: any,
  CropperPreviewComponent: any,
  cropperAspect: number | undefined,
  needShowCropper: boolean,
) => {
  const ImageComponent = ImagePreviewComponent ?? ImagePreview;
  return (
    <ImageComponent
      image={image}
      fitView={fitView}
      cropper={cropper}
      cropHandle={cropHandle}
      CropperPreviewComponent={CropperPreviewComponent}
      cropperAspect={cropperAspect}
      needShowCropper={needShowCropper}
    />
  );
};

const renderVideoPreview = (
  VideoPreviewComponent: any,
  fileName: string,
  fileSize: number,
) => {
  const VideoComponent = VideoPreviewComponent ?? VideoPreview;
  return <VideoComponent fileName={fileName} fileSize={fileSize} />;
};

const renderAudioPreview = (
  AudioPreviewComponent: any,
  fileName: string,
  fileSize: number,
) => {
  const AudioComponent = AudioPreviewComponent ?? AudioPreview;
  return <AudioComponent fileName={fileName} fileSize={fileSize} />;
};

interface IFieldProps extends FieldRenderProps<string> {
  disabled?: boolean;
  maxSize?: Bytes;
  className?: string;
  acceptsHint?: string[];
  accepts?: string[];
  fitView?: boolean;
  label?: string;
  cropper?: boolean;
  cropperAspect?: number;
  InitialBlockComponent?: JSX.Element;
  FileUploadedComponent?: JSX.Element;
  ImagePreviewComponent?: JSX.Element;
  VideoPreviewComponent?: JSX.Element;
  AudioPreviewComponent?: JSX.Element;
  FilePreviewComponent?: JSX.Element;
}

export const UploadFileField = ({
  input: { name, onChange, value },
  meta,
  disabled,
  maxSize = MAX_SIZE,
  acceptsHint,
  accepts = [],
  fitView = false,
  className,
  label,
  cropper = false,
  cropperAspect = 1,
  InitialBlockComponent,
  UploadedWrapComponent,
  ImagePreviewComponent,
  VideoPreviewComponent,
  AudioPreviewComponent,
  FilePreviewComponent,
  CropperPreviewComponent,
}: IFieldProps & TextFieldProps) => {
  const classes = useUploadFileStyles();

  const [cover, setCover] = useState<null | JSX.Element>(null);

  let needShowCropper = useRef<boolean>(true);

  const renderPreview = useCallback(
    async file => {
      let filePreview: string | JSX.Element;
      if (IMAGE_FILES_MIMES.includes(file.type)) {
        const cropHandle = (img: string) => {
          const file = dataUrlToFile(img, 'cropped-img.png');
          needShowCropper.current = false;
          renderPreview(file).catch(error => console.error(error));
        };
        let { image } = await readImage(file);
        filePreview = renderImagePreview(
          ImagePreviewComponent,
          image,
          fitView,
          cropper,
          cropHandle,
          CropperPreviewComponent,
          cropperAspect,
          needShowCropper.current,
        );
      } else if (VIDEO_FILES_MIMES.includes(file.type)) {
        filePreview = renderVideoPreview(
          VideoPreviewComponent,
          file.name,
          file.size,
        );
      } else if (AUDIO_FILES_MIMES.includes(file.type)) {
        filePreview = renderAudioPreview(
          AudioPreviewComponent,
          file.name,
          file.size,
        );
      } else {
        filePreview = renderFilePreview(
          FilePreviewComponent,
          file.name,
          file.size,
        );
      }
      setCover(filePreview);
      onChange(file);
      needShowCropper.current = true;
    },
    [
      onChange,
      fitView,
      AudioPreviewComponent,
      FilePreviewComponent,
      ImagePreviewComponent,
      VideoPreviewComponent,
      CropperPreviewComponent,
      cropper,
      cropperAspect,
      needShowCropper,
    ],
  );

  const handleReset = useCallback(() => {
    setCover(null);
    onChange(undefined);
  }, [onChange]);

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement> & {
        dataTransfer: DataTransfer;
      },
    ) => {
      event.preventDefault();
      const files = (() => {
        if (event.dataTransfer) {
          return event.dataTransfer.files;
        } else if (event.target) {
          return event.target.files;
        }
      })();

      if (files) {
        let file = files[0];
        renderPreview(file).catch(error => console.error(error));
      } else {
        onChange(undefined);
      }
    },
    [onChange, renderPreview],
  );

  const input = useMemo(() => {
    return (
      <input
        type="file"
        accept={accepts.join(',')}
        name={name}
        onChange={handleChange}
        className={classes.input}
      />
    );
  }, [accepts, name, handleChange, classes.input]);

  return (
    <div className={className}>
      <div className={classNames(classes.root, disabled && classes.disabled)}>
        {label && <InputLabel shrink>{label}</InputLabel>}
        <div className={classes.container}>
          {value
            ? renderUploadedWrapPreview(
                UploadedWrapComponent,
                input,
                cover,
                handleReset,
              )
            : renderInitialBlock(
                InitialBlockComponent,
                input,
                acceptsHint,
                maxSize,
              )}
        </div>
      </div>
      <FormHelperText error={true}>{getErrorText(meta)}</FormHelperText>
    </div>
  );
};
