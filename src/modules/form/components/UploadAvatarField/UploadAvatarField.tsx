import { FormHelperText, InputLabel, TextFieldProps } from '@material-ui/core';
import { IMAGE_FILES_MIMES } from 'modules/common/utils/mimeTypes';
import { getErrorText } from 'modules/form/utils/getErrorText';
import { readImage } from 'modules/form/utils/readImage';
import React, { useCallback, useMemo, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { InnerBlock } from './components/InnerBlock';
import { useUploadAvatarFieldStyles } from './useUploadAvatarFieldStyles';

interface IFieldProps extends FieldRenderProps<string> {
  className?: string;
  accepts?: string[];
  label?: string;
  initialAvatar?: string;
}

export const UploadAvatarField = ({
  input: { name, onChange, value },
  meta,
  accepts = [],
  className,
  label,
  initialAvatar = '',
}: IFieldProps & TextFieldProps) => {
  const classes = useUploadAvatarFieldStyles();

  const inputRef = React.useRef(null);
  const [avatar, setAvatar] = useState<string>(initialAvatar);

  const handleReset = useCallback(() => {
    setAvatar(initialAvatar);
    onChange(undefined);
  }, [initialAvatar, onChange]);

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

      if (files && files.length) {
        const file = files[0];
        if (IMAGE_FILES_MIMES.includes(file.type)) {
          const { image } = await readImage(file);
          setAvatar(image);
          onChange(file);
        }
      }
    },
    [onChange],
  );

  const input = useMemo(() => {
    return (
      <input
        type="file"
        accept={accepts.join(',')}
        name={name}
        onChange={handleChange}
        className={classes.input}
        ref={inputRef}
      />
    );
  }, [accepts, name, handleChange, classes.input]);

  return (
    <div className={className}>
      <div className={classes.root}>
        {label && <InputLabel shrink>{label}</InputLabel>}
        <div className={classes.container}>
          <InnerBlock
            avatar={avatar}
            value={value}
            input={input}
            inputRef={inputRef}
            handleReset={handleReset}
          />
        </div>
      </div>
      <FormHelperText error={true}>{getErrorText(meta)}</FormHelperText>
    </div>
  );
};
