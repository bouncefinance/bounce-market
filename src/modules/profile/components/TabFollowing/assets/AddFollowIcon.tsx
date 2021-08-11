import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const AddFollowIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 17 16">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.5 0H7.5V7H0.5V9H7.5V16H9.5V9H16.5V7H9.5V0Z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
};
