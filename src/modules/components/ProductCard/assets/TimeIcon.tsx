import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const TimeIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <g fill="none">
        <circle
          cx="8"
          cy="8"
          r="7.25"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M8 4V9H12" stroke="currentColor" />
      </g>
    </SvgIcon>
  );
};
