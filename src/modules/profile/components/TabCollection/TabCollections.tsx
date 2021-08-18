import { Grid } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import {
  IMyBrand,
  queryMyBrandItem,
} from 'modules/brand/actions/queryMyBrandItem';
import { CollectHeaderCreate } from 'modules/brand/components/CollectHeaderCreate';
import { CollectionCard } from 'modules/brand/components/CollectionCard';
import { CollectionList } from 'modules/brand/components/CollectionList';
import { CollectionNFTItems } from 'modules/brand/components/CollectionNFTItems';
import { RoyaltyDialog } from 'modules/brand/components/RoyaltyDialog';
import { NoItems } from 'modules/common/components/NoItems';
import { truncateLongName } from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { useState } from 'react';
import { uid } from 'react-uid';
import { useTabCollectionStyles } from './useTabCollectionStyles';

export const TabCollection: React.FC<{
  isOther?: boolean;
  address?: string;
}> = ({ isOther = false, address = '' }) => {
  const classes = useTabCollectionStyles();
  const { data: brands, loading } = useQuery<IMyBrand[]>({
    type: queryMyBrandItem.toString(),
  });
  const [royaltyOpen, setRoyaltyOpen] = useState(false);
  const [collection, setCollection] = useState('');
  const { chainId } = useAccount();

  const handelOpenRoyalty: (collection: string) => void = collection => {
    setCollection(collection);
    setRoyaltyOpen(!royaltyOpen);
  };

  return (
    <>
      {isOther || <CollectHeaderCreate />}
      <Grid container spacing={4} className={classes.root}>
        {loading ? (
          <></>
        ) : (
          <CollectionList>
            {brands?.map(brand => (
              <CollectionCard
                key={uid(brand.contract)}
                name={truncateLongName(brand.title)}
                img={brand.imgSrc}
                descr={brand.desc}
                chainId={chainId}
                nftItems={
                  <CollectionNFTItems
                    ownerAddress={address}
                    contractAddress={brand.contract}
                  />
                }
                handelOpenRoyalty={handelOpenRoyalty}
                href={ProfileRoutesConfig.Collection.generatePath(
                  brand.contract,
                )}
              />
            ))}
          </CollectionList>
        )}
      </Grid>
      {!loading && brands?.length === 0 && isOther && (
        <NoItems
          href={MarketRoutesConfig.Market.generatePath()}
          title={
            isOther
              ? t('profile.no-items.other-collection-title')
              : t('profile.no-items.collection-title')
          }
          descr={
            isOther ? t('profile.no-items.other-collection-description') : ''
          }
        />
      )}

      <RoyaltyDialog
        isOpen={royaltyOpen}
        onClose={() => {
          setRoyaltyOpen(false);
        }}
        collection={collection}
      />
    </>
  );
};
