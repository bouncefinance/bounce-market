import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const VerifiedIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="#2F80ED" />
        <rect x="16" y="14.3999" width="4.8" height="4.8" fill="white" />
        <rect x="20.8008" y="9.6001" width="4.8" height="4.8" fill="white" />
        <rect x="6.40039" y="14.3999" width="4.8" height="4.8" fill="white" />
        <rect
          x="11.1992"
          y="24"
          width="4.8"
          height="4.8"
          transform="rotate(-90 11.1992 24)"
          fill="white"
        />
      </svg>
    </SvgIcon>
  );
};
