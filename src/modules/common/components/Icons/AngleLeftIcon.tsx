import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const AngleLeftIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 18 18">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M13 17L5 9l8-8"
      />
    </SvgIcon>
  );
};
