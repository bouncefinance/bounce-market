import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const ShareIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 26 26">
      <path
        fill="none"
        stroke="currentColor"
        d="M4 15.364v5.682h18.182v-5.682M7.408 9.682L13.09 4l5.682 5.682M13.092 4v12.5"
      />
    </SvgIcon>
  );
};
