import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const VerticalDotsIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <circle cx="10" cy="4" r="2" fill="currentColor" />
      <circle cx="10" cy="10" r="2" fill="currentColor" />
      <circle cx="10" cy="16" r="2" fill="currentColor" />
    </SvgIcon>
  );
};
