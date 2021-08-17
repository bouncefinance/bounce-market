import { Grid } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
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
import { t } from 'modules/i18n/utils/intl';
import { MarketRoutesConfig } from 'modules/market/Routes';
import {
  ProfileRoutesConfig,
  USER_CREATE_NFT_PROFILE,
} from 'modules/profile/ProfileRoutes';
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
                name={brand.title}
                img={brand.imgSrc}
                descr={brand.contract}
                nftItems={
                  <CollectionNFTItems
                    ownerAddress={'0x2D3Fff58da3346dCE601F6DB8eeC57906CDB17bE'}
                    contractAddress={
                      '0x963fdb6a8559ef0d803981c6a7f29675a4bba868'
                    }
                  />
                }
                handelOpenRoyalty={handelOpenRoyalty}
                href={
                  isOther
                    ? ProfileRoutesConfig.OtherProfile.generatePath(
                        address,
                        USER_CREATE_NFT_PROFILE,
                        brand.contract || undefined,
                        brand.id,
                      )
                    : ProfileRoutesConfig.UserProfile.generatePath(
                        USER_CREATE_NFT_PROFILE,
                        brand.contract || undefined,
                        brand.id,
                      )
                }
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
