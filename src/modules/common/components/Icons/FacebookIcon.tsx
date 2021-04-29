import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const FacebookIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <g fill="none">
        <path
          fill="currentColor"
          d="M24 12c0-6.628-5.372-12-12-12S0 5.372 0 12c0 5.99 4.388 10.955 10.125 11.855v-8.386H7.078V12h3.047V9.356c0-3.007 1.79-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.926-1.955 1.875V12h3.328l-.532 3.469h-2.796v8.386C19.613 22.955 24 17.99 24 12z"
        />
        <path
          fill="var(--fb-inner-color, #fff)"
          d="M16.671 15.469L17.203 12h-3.328V9.75c0-.95.464-1.875 1.955-1.875h1.514V4.922s-1.374-.234-2.686-.234c-2.742 0-4.533 1.661-4.533 4.668V12H7.078v3.469h3.047v8.386a12.071 12.071 0 003.75 0v-8.386h2.796z"
        />
      </g>
    </SvgIcon>
  );
};
