import React, { useCallback, useState } from 'react';

export const useHeader = () => {
  const [mobileNavShowed, setMobileNavShowed] = useState(false);

  const toggleNav = useCallback(
    (isOpen: boolean) => (event: any) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setMobileNavShowed(isOpen);
    },
    [],
  );

  return { mobileNavShowed, toggleNav };
};
