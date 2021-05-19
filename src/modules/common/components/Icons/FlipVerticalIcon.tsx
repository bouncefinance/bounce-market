import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const FlipVerticalIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        d="m3 15v2h2v-2zm12 4v2h2v-2zm4-16h-14c-1.1 0-2 0.9-2 2v4h2v-4h14v4h2v-4c0-1.1-0.9-2-2-2zm2 16h-2v2c1.1 0 2-0.9 2-2zm-20-8v2h22v-2zm6 8v2h2v-2zm12-4v2h2v-2zm-8 4v2h2v-2zm-8 0c0 1.1 0.9 2 2 2v-2z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
