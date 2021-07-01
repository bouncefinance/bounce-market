import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import { SocialShare } from 'modules/common/components/SocialShare';
import { DropsOwner } from 'modules/drops/components/DropsOwner';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import React from 'react';
import { DescriptionComponent } from './DescriptionComponent';

export const Description = () => {
  return (
    <DescriptionComponent
      title="Drop Details heading"
      text="Primal Cypher is a conceptual digital artist, amongst many other things (designer, oil painter, NFT writer and consultant). He’s well-known for his bold artwork which usually often contain strong social commentaries, as well themes relating to psychology, philosophy and spirituality. Primal Cypher’s artwork has a strong affinity for blockchain, particularly Ethereum, Anonymous, The Occupy and Cypherpunk movement, which is often reflected in his work."
      creator={<DropsOwner title="grossehalbuer" />}
      share={
        <SocialShare
          titleString="some title"
          url="//google.com"
          buttonContent={
            <Button variant="outlined" rounded startIcon={<ShareIcon />}>
              {t('social.share')}
            </Button>
          }
        />
      }
    />
  );
};
