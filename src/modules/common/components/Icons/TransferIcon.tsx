import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const TransferIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        d="M5 10h13l-3.12-4"
        className="animate__animated animate__lightSpeedInLeft"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
      />
      <path
        d="M19 14H6l3.12 4"
        className="animate__animated animate__lightSpeedInRight"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
      />
    </SvgIcon>
  );
};
