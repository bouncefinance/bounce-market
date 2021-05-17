import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const InstagramIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <g fill="none">
        <rect
          width="18"
          height="18"
          x="1"
          y="1"
          stroke="currentColor"
          strokeWidth="2"
          rx="4"
        />
        <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="15.5" cy="4.5" r="1.5" fill="currentColor" />
      </g>
    </SvgIcon>
  );
};
