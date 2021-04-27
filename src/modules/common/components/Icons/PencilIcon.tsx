import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const PencilIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 25 24">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6 14.929l-1.768 5.303 5.304-1.767L6 14.929zm4.243 2.828l-3.536-3.535 9.9-9.9 3.535 3.536-9.9 9.9zM20.849 7.151l-3.535-3.536 2.121-2.121 3.536 3.535-2.122 2.122z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
};
