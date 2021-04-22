import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const CloseIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 40 40">
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M29.698 29.9L9.9 10.1M9.9 29.9l19.798-19.8"
      />
    </SvgIcon>
  );
};
