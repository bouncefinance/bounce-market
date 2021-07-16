import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const VerifiedIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="8" fill="url(#paint0_linear)" />
        <path d="M4.5 8L7 10.5L12 5.5" stroke="white" stroke-width="1.5" />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="21.3333"
            y1="13.3333"
            x2="1.33333"
            y2="13.3333"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#2663FF" />
            <stop offset="1" stop-color="#FF3828" />
          </linearGradient>
        </defs>
      </svg>
    </SvgIcon>
  );
};
