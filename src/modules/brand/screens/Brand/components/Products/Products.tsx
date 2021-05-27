import { Box } from '@material-ui/core';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { QueryLoadingCentered } from 'modules/common/components/QueryLoading/QueryLoading';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { mapNFTItem } from 'modules/overview/api/mapNFTItem';
import { ProductsPanel } from 'modules/overview/components/ProductsPanel';
import React, { useMemo } from 'react';
import { uid } from 'react-uid';
import { NotConnected } from '../NotConnected';
import { useBrandProducts } from './useBrandProducts';

export const Products = () => {
  const {
    catergory,
    loading,
    onCategoryChange,
    onSortChange,
    sortBy,
    brandNfts,
    isConnected,
  } = useBrandProducts();

  const hasItems = Boolean(brandNfts && brandNfts.length);

  const renderedCards = useMemo(
    () =>
      brandNfts?.map(mapNFTItem).map(item => (
        <ProductCard
          isOnSale
          id={item.id}
          poolId={item.poolId}
          auctionType={item.poolType}
          key={uid(item)}
          title={item.title}
          price={item.price}
          priceType={item.priceType}
          endDate={item.endDate}
          copies={item.copies}
          likes={item.likes}
          href={item.href}
          MediaProps={{
            category: item.category,
            src: item.src,
            objectFit: 'contain',
            loading: 'lazy',
          }}
          ProfileInfoProps={item.ProfileInfoProps}
        />
      )),
    [brandNfts],
  );

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

      {!isConnected && <NotConnected />}

      {isConnected && loading && <QueryLoadingCentered mt={4} />}

      {isConnected && !loading && !hasItems && (
        <NoItems href={MarketRoutesConfig.Market.generatePath()} />
      )}

      {isConnected && !loading && hasItems && (
        <ProductCards>{renderedCards}</ProductCards>
      )}
    </>
  );
};
