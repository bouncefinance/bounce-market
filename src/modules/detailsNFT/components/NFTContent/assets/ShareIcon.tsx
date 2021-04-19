import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const ShareIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path
        fill="none"
        stroke="currentColor"
        d="M1 10.008v5h14v-5M3 4.943l5-3.95m0 0l5 3.95M8 .993v10"
      />
    </SvgIcon>
  );
};
