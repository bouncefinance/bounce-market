import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const TransferIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d="M5 10h13l-3.12-4M19 14H6l3.12 4"
      />
    </SvgIcon>
  );
};
