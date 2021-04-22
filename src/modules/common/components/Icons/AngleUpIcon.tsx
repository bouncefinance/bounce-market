import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const AngleUpIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 22 22">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M21 16L11 6 1 16"
      />
    </SvgIcon>
  );
};
