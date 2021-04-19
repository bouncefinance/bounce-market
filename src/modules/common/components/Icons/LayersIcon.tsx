import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const LayersIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 19 19">
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        <path
          strokeLinecap="round"
          d="M1 11.531l8.267 4.347a.5.5 0 00.466 0L18 11.53"
        />
        <path d="M9.733 3.122a.5.5 0 00-.466 0L1.842 7.026a.5.5 0 000 .885l7.425 3.904a.5.5 0 00.466 0l7.425-3.904a.5.5 0 000-.885L9.733 3.122z" />
      </g>
    </SvgIcon>
  );
};
