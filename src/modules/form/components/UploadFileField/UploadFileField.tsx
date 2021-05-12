import { FormHelperText, InputLabel, TextFieldProps } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import classNames from 'classnames';
import { getErrorText } from '../../utils/getErrorText';
import { readImage } from '../../utils/readImage';
import { useUploadFileStyles } from './useUploadFileStyles';
import {
  IMAGE_FILES_MIMES,
  VIDEO_FILES_MIMES,
  AUDIO_FILES_MIMES,
} from './mimeTypes';

import { InitialBlock as BigBlockInitialBlock } from './components/templates/bigBlock/InitialBlock';
import { FilePreview as BigBlockFilePreview } from './components/templates/bigBlock/FilePreview';
import { ImagePreview as BigBlockImagePreview } from './components/templates/bigBlock/ImagePreview';
import { VideoPreview as BigBlockVideoPreview } from './components/templates/bigBlock/VideoPreview';
import { AudioPreview as BigBlockAudioPreview } from './components/templates/bigBlock/AudioPreview';
import { FileUploaded as BigBlockFileUploaded } from './components/templates/bigBlock/FileUploaded';
import { Bytes } from '../../../common/types/unit';

type FileFieldTemplate = 'bigBlock' | 'avatarFullBlock' | undefined;

const MAX_SIZE: Bytes = 31457280;

interface IFieldProps extends FieldRenderProps<string> {
  maxSize?: Bytes;
  className?: string;
  acceptsHint?: string[];
  accepts?: string[];
  template?: FileFieldTemplate;
  fitView?: boolean;
  label?: string;
}

const renderInitialBlock = (
  template: FileFieldTemplate,
  input: JSX.Element,
  acceptsHint: string[] | undefined,
  maxSize: Bytes | undefined,
) => {
  switch (template) {
    case 'bigBlock':
    default:
      return (
        <BigBlockInitialBlock
          input={input}
          acceptsHint={acceptsHint}
          maxSize={maxSize}
        />
      );
  }
};

const renderFilePreview = (
  template: FileFieldTemplate,
  fileName: string,
  fileSize: number,
) => {
  switch (template) {
    case 'bigBlock':
      return <BigBlockFilePreview fileName={fileName} fileSize={fileSize} />;
    default:
      return <></>;
  }
};

const renderImagePreview = (
  template: FileFieldTemplate,
  image: string,
  fitView: boolean,
) => {
  switch (template) {
    case 'bigBlock':
      return <BigBlockImagePreview image={image} fitView={fitView} />;
    default:
      return <></>;
  }
};

const renderVideoPreview = (
  template: FileFieldTemplate,
  fileName: string,
  fileSize: number,
) => {
  switch (template) {
    case 'bigBlock':
      return <BigBlockVideoPreview fileName={fileName} fileSize={fileSize} />;
    default:
      return <></>;
  }
};

const renderAudioPreview = (
  template: FileFieldTemplate,
  fileName: string,
  fileSize: number,
) => {
  switch (template) {
    case 'bigBlock':
      return <BigBlockAudioPreview fileName={fileName} fileSize={fileSize} />;
    default:
      return <></>;
  }
};

const renderFileUploadPreview = (
  template: FileFieldTemplate,
  cover: null | JSX.Element,
  input: JSX.Element,
  handleReset: any,
) => {
  switch (template) {
    case 'bigBlock':
      return (
        <BigBlockFileUploaded
          cover={cover}
          input={input}
          handleReset={handleReset}
        />
      );
    default:
      return <></>;
  }
};

export const UploadFileField = ({
  input: { name, onChange, value },
  meta,
  maxSize = MAX_SIZE,
  acceptsHint,
  accepts = [],
  template = 'bigBlock',
  fitView = false,
  className,
  label,
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
          filePreview = renderImagePreview(template, image, fitView);
        } else if (VIDEO_FILES_MIMES.includes(file.type)) {
          filePreview = renderVideoPreview(template, file.name, file.size);
        } else if (AUDIO_FILES_MIMES.includes(file.type)) {
          filePreview = renderAudioPreview(template, file.name, file.size);
        } else {
          filePreview = renderFilePreview(template, file.name, file.size);
        }
        setCover(filePreview);
        onChange(file);
      } else {
        onChange(undefined);
      }
    },
    [onChange, maxSize, template, fitView],
  );

  const input = (
    <input
      type="file"
      accept={accepts.join(',')}
      name={name}
      onChange={handleChange}
      className={classes.input}
    />
  );

  return (
    <div
      className={classNames(className, {
        [classes.bigBlock]: template === 'bigBlock',
        [classes.avatarFullBlock]: template === 'avatarFullBlock',
      })}
    >
      <div className={classes.root}>
        {label && <InputLabel shrink>{label}</InputLabel>}
        <div className={classes.container}>
          {value
            ? renderFileUploadPreview(template, cover, input, handleReset)
            : renderInitialBlock(template, input, acceptsHint, maxSize)}
        </div>
      </div>
      <FormHelperText error={true}>{getErrorText(meta)}</FormHelperText>
    </div>
  );
};
