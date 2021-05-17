import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const PlusIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6.25 7.75V14h1.5V7.75H14v-1.5H7.75V0h-1.5v6.25H0v1.5h6.25z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
};
