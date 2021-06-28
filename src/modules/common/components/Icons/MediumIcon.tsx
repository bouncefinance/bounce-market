import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React from 'react';

export const MediumIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 18 18">
      <path fill="currentColor" d="M18 0H0v18h18V0z" />
      <path
        fill="var(--medium-icon-color, #fff)"
        d="M4.296 6.02a.468.468 0 00-.153-.395l-1.129-1.36v-.203H6.52l2.71 5.942 2.382-5.942h3.342v.203l-.965.925a.282.282 0 00-.108.271v6.8a.282.282 0 00.108.272l.942.925v.204H10.19v-.204l.977-.948c.096-.096.096-.124.096-.27V6.741L8.547 13.64H8.18L5.018 6.742v4.623a.638.638 0 00.175.53l1.27 1.54v.204H2.862v-.203l1.27-1.54a.615.615 0 00.164-.531V6.02z"
      />
    </SvgIcon>
  );
};
