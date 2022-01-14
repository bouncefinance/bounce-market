import { Products } from 'modules/overview/components/Products';
import { Img } from 'modules/uiKit/Img';
import React from 'react';
import { useOverviewStyles } from './useOverviewStyles';

export const Overview = () => {
  const classes = useOverviewStyles();

  return (
    <div className={classes.root}>
      <div style={{ backgroundColor: '#000' }}>
        <Img
          style={{
            maxWidth: '100vw',
            minWidth: '100vw',
            width: '100vw',
            maxHeight: '500px',
          }}
          src="https://ap1-cfs3-media-bounce.bounce.finance/e0ffc3992712350b70c1f2a2d9cb8266-1642157257.png"
        />
      </div>

      <Products stackUp style={{ position: 'relative' }} />
    </div>
  );
};
