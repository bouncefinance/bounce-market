import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const DoneIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <g fill="none">
        <path d="M3 9.70588L7.84615 15L17 5" stroke="currentColor" strokeWidth="1.5"/>
      </g>
    </SvgIcon>
  );
};