import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const SearchIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <circle
        cx="11"
        cy="11"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path stroke="currentColor" strokeWidth="2" d="M15.5 15.5l5 5" />
    </SvgIcon>
  );
};
