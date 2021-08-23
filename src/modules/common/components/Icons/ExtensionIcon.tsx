import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const ExtensionIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 50 50">
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="50" height="50" rx="25" fill="white" />
        <circle cx="25" cy="19" r="2" fill="#727272" />
        <circle cx="25" cy="25" r="2" fill="#727272" />
        <circle cx="25" cy="31" r="2" fill="#727272" />
        <rect
          x="0.5"
          y="0.5"
          width="49"
          height="49"
          rx="24.5"
          stroke="black"
          strokeOpacity="0.1"
        />
      </svg>
    </SvgIcon>
  );
};
