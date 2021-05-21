import { Box } from '@material-ui/core';
import { useAccount } from 'modules/account/hooks/useAccount';
import { queryBrandNfts } from 'modules/brand/actions/queryBrandNfts';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/types/ResponseData';
import { mapNFTItem } from 'modules/overview/api/mapNFTItem';
import { ProductsPanel } from 'modules/overview/components/ProductsPanel';
import React from 'react';
import { uid } from 'react-uid';
import { NotConnected } from '../NotConnected';
import { useBrandProducts } from './useBrandProducts';

export const Products = () => {
  const { isConnected } = useAccount();
  const {
    catergory,
    loading,
    onCategoryChange,
    onSortChange,
    sortBy,
  } = useBrandProducts();

  return (
    <>
      <Box mb={6}>
        <ProductsPanel
          onSortChange={onSortChange}
          onCategoryChange={onCategoryChange}
          catergory={catergory}
          sortBy={sortBy}
          disabled={loading}
        />
      </Box>

      {isConnected ? (
        <Queries<ResponseData<typeof queryBrandNfts>>
          requestActions={[queryBrandNfts]}
        >
          {({ data }) => {
            const nftItems = data.map(mapNFTItem);

            return (
              <ProductCards>
                {nftItems.map(cardProps => (
                  <ProductCard
                    isOnSale
                    key={uid(cardProps)}
                    title={cardProps.title}
                    price={cardProps.price}
                    priceType={cardProps.priceType}
                    endDate={cardProps.endDate}
                    copies={cardProps.copies}
                    likes={cardProps.likes}
                    href={cardProps.href}
                    MediaProps={{
                      category: cardProps.category,
                      src: cardProps.src,
                      objectFit: 'scale-down',
                      loading: 'lazy',
                    }}
                    ProfileInfoProps={cardProps.ProfileInfoProps}
                  />
                ))}
              </ProductCards>
            );
          }}
        </Queries>
      ) : (
        <NotConnected />
      )}
    </>
  );
};
