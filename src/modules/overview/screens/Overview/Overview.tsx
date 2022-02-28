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
          original
          // src="https://ap1-cfs3-media-bounce.bounce.finance/e0ffc3992712350b70c1f2a2d9cb8266-1642157257.png"
          src="https://ap1-cfs3-media-bounce.bounce.finance/a90fea2c135a3dfaee31a8c1fdfda0c7-1646063280.jpg"
        />
      </div>

      <Products stackUp style={{ position: 'relative' }} />
    </div>
  );
};
