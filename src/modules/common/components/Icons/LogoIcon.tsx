import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const LogoIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 17 24">
      <path
        d="M 11.332031 0.66601562 L 11.332031 6.3320312 L 17 6.3320312 L 17 0.66601562 L 11.332031 0.66601562 z M 11.332031 6.3320312 L 5.6660156 6.3320312 L 5.6660156 12 L 0 12 L 0 17.666016 L 5.6660156 17.666016 L 5.6660156 23.332031 L 11.333984 23.332031 L 11.333984 17.666016 L 17 17.666016 L 17 12 L 11.333984 12 L 11.332031 6.3320312 z "
        fill="currentColor"
      />
    </SvgIcon>
  );
};
