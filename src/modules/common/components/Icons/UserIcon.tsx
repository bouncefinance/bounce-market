import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const UserIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 13 13">
      <g fill="none">
        <circle cx="6.5" cy="3.5" r="3" stroke="currentColor" />
        <path
          stroke="currentColor"
          d="M5.06 8.5h2.88a4.5 4.5 0 014.446 3.806l.03.194H.584l.03-.194A4.5 4.5 0 015.06 8.5z"
        />
      </g>
    </SvgIcon>
  );
};
