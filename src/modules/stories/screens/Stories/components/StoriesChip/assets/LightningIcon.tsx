import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const LightningIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 512 512">
      <path
        fill="#ffb555"
        d="M414.53 206.49L256 391.91l-69.64-169.506L256 0h99.94l-73 206.49z"
      />
      <path
        fill="#fd5"
        d="M256 0v391.91L153.33 512h-36.24l74.06-227.83H97.47L196.59 0z"
      />
    </SvgIcon>
  );
};
