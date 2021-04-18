import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const AngleDownIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 22 22">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M1 6l10 10L21 6"
      />
    </SvgIcon>
  );
};
