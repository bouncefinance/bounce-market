import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const CheckmarkIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 18 14">
      <path
        fill="none"
        stroke="currentColor"
        d="M0.75 7L6.25 12.5L17.25 1.5"
        strokeWidth="2"
      />
    </SvgIcon>
  );
};
