import { Box } from '@material-ui/core';
import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import { Social } from 'modules/common/components/Social';
import { SocialShare } from 'modules/common/components/SocialShare';
import { DropsOwner } from 'modules/drops/components/DropsOwner';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import React, { useEffect, useState } from 'react';
import { Timer } from '../Timer';
import { DescriptionComponent } from './DescriptionComponent';
import { DescriptionSkeleton } from './DescriptionSkeleton';
import { useDescriptionStyles } from './useDescriptionStyles';

export const Description = () => {
  const classes = useDescriptionStyles();
  // for demo purpose
  const [loading, setLoading] = useState(true);

  // for demo purpose
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Box mb={{ xs: 8, md: 12 }}>
      {loading ? (
        <DescriptionSkeleton />
      ) : (
        <DescriptionComponent
          timer={<Timer endDate={new Date('2021-07-05T16:29:30')} />}
          title="Drop Details heading"
          text="Primal Cypher is a conceptual digital artist, amongst many other things (designer, oil painter, NFT writer and consultant). He’s well-known for his bold artwork which usually often contain strong social commentaries, as well themes relating to psychology, philosophy and spirituality. Primal Cypher’s artwork has a strong affinity for blockchain, particularly Ethereum, Anonymous, The Occupy and Cypherpunk movement, which is often reflected in his work."
          creator={<DropsOwner title="grossehalbuer" />}
          share={
            <SocialShare
              titleString="some title"
              url="//google.com"
              buttonContent={
                <Button
                  className={classes.shareBtn}
                  variant="outlined"
                  rounded
                  startIcon={<ShareIcon />}
                >
                  {t('social.share')}
                </Button>
              }
            />
          }
          social={<Social twitter="#" instagram="#" />}
        />
      )}
    </Box>
  );
};
