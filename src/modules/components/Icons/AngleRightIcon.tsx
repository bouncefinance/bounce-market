import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const AngleRightIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 18 18">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M4.5 17l8-8-8-8"
      />
    </SvgIcon>
  );
};
