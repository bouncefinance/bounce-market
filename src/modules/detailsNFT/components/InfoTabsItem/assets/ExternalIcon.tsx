import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const ExternalIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d="M4.63 2H1v13h13.482v-3.5m-7.26-3L15 1m0 0H8.26M15 1v6.5"
      />
    </SvgIcon>
  );
};
