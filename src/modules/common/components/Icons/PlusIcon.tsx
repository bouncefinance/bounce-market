import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const PlusIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        className="animate__animated animate__rotateIn"
        d="M10.5 13.5H3V10.5H10.5V3H13.5V10.5H21V13.5H13.5V21H10.5V13.5Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
