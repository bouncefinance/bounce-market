import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const VerifiedIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="10" fill="#010101" />
      <path
        fill="#fff"
        d="M10 9h3v3h-3zM13 6h3v3h-3zM4 9h3v3H4zM7 15v-3h3v3z"
      />
    </SvgIcon>
  );
};
