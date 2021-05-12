import { FormHelperText, InputLabel, TextFieldProps } from '@material-ui/core';
import React, { useCallback, useMemo, useState } from 'react';
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
import { FileUploaded } from './components/FileUploaded';
import { Bytes } from 'modules/common/types/unit';

const MAX_SIZE: Bytes = 31457280;

interface IFieldProps extends FieldRenderProps<string> {
  maxSize?: Bytes;
  className?: string;
  acceptsHint?: string[];
  accepts?: string[];
  fitView?: boolean;
  label?: string;
  InitialBlockComponent?: any;
  FileUploadedComponent?: any;
  ImagePreviewComponent?: any;
  VideoPreviewComponent?: any;
  AudioPreviewComponent?: any;
  FilePreviewComponent?: any;
}

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

const renderFileUploadPreview = (
  FileUploadedComponent: any,
  cover: null | JSX.Element,
  input: JSX.Element,
  handleReset: any,
): any => {
  if (FileUploadedComponent) {
    return (
      <FileUploadedComponent
        cover={cover}
        input={input}
        handleReset={handleReset}
      />
    );
  }
  return <FileUploaded cover={cover} input={input} handleReset={handleReset} />;
};

const renderFilePreview = (
  FilePreviewComponent: any,
  fileName: string,
  fileSize: number,
) => {
  if (FilePreviewComponent) {
    return <FilePreviewComponent fileName={fileName} fileSize={fileSize} />;
  }
  return <FilePreview fileName={fileName} fileSize={fileSize} />;
};

const renderImagePreview = (
  ImagePreviewComponent: any,
  image: string,
  fitView: boolean,
) => {
  if (ImagePreviewComponent) {
    return <ImagePreviewComponent image={image} fitView={fitView} />;
  }
  return <ImagePreview image={image} fitView={fitView} />;
};

const renderVideoPreview = (
  VideoPreviewComponent: any,
  fileName: string,
  fileSize: number,
) => {
  if (VideoPreviewComponent) {
    return <VideoPreviewComponent fileName={fileName} fileSize={fileSize} />;
  }
  return <VideoPreview fileName={fileName} fileSize={fileSize} />;
};

const renderAudioPreview = (
  AudioPreviewComponent: any,
  fileName: string,
  fileSize: number,
) => {
  if (AudioPreviewComponent) {
    return <AudioPreviewComponent fileName={fileName} fileSize={fileSize} />;
  }
  return <AudioPreview fileName={fileName} fileSize={fileSize} />;
};

export const UploadFileField = ({
  input: { name, onChange, value },
  meta,
  maxSize = MAX_SIZE,
  acceptsHint,
  accepts = [],
  fitView = false,
  className,
  label,
  InitialBlockComponent,
  FileUploadedComponent,
  ImagePreviewComponent,
  VideoPreviewComponent,
  AudioPreviewComponent,
  FilePreviewComponent,
}: IFieldProps & TextFieldProps) => {
  const classes = useUploadFileStyles();
  const [cover, setCover] = useState<null | JSX.Element>(null);

  const handleReset = useCallback(() => {
    setCover(null);
    onChange(undefined);
  }, [onChange]);

  const handleChange = useCallback(
    async (
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
        const file = files[0];
        let filePreview: string | JSX.Element;
        if (IMAGE_FILES_MIMES.includes(file.type)) {
          const { image } = await readImage(file);
          filePreview = renderImagePreview(
            ImagePreviewComponent,
            image,
            fitView,
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
      } else {
        onChange(undefined);
      }
    },
    [
      onChange,
      fitView,
      AudioPreviewComponent,
      FilePreviewComponent,
      ImagePreviewComponent,
      VideoPreviewComponent,
    ],
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
      <div className={classes.root}>
        {label && <InputLabel shrink>{label}</InputLabel>}
        <div className={classes.container}>
          {value
            ? renderFileUploadPreview(
                FileUploadedComponent,
                cover,
                input,
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
