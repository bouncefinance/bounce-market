import { SvgIcon, SvgIconProps } from '@material-ui/core';

export const ETHIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0V22.0391L0 27L12 0Z" fill="#8891AE" />
      <path d="M12 0V22.0391L24 27L12 0Z" fill="#5F658C" />
      <path d="M12 48V36.5323L0 30L12 48Z" fill="#868BB1" />
      <path d="M12 48V36.5323L24 30L12 48Z" fill="#5E648D" />
      <path d="M0 26.0833L12 21V33L0 26.0833Z" fill="#61668D" />
      <path d="M24 26.0833L12 21V33L24 26.0833Z" fill="#404871" />
    </SvgIcon>
  );
};
