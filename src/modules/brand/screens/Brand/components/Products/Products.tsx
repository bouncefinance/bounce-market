import { Box } from '@material-ui/core';
import { AccountInfo } from 'modules/common/components/AccountInfo';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { mapProductCardData } from 'modules/overview/api/mapProductCardData';
import { ProductsPanel } from 'modules/overview/components/ProductsPanel';
import React, { useMemo } from 'react';
import { uid } from 'react-uid';
import { useBrandProducts } from './useBrandProducts';

export const Products = () => {
  const {
    catergory,
    loading,
    onCategoryChange,
    onSortChange,
    sortBy,
    brandNfts,
  } = useBrandProducts();

  const hasItems = Boolean(brandNfts && brandNfts.length);

  const renderedCards = useMemo(
    () =>
      brandNfts?.map(mapProductCardData).map(item => (
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
          profileInfo={
            item.ownerAddress && <AccountInfo address={item.ownerAddress} />
          }
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

      {/* {!isConnected && <NotConnected />} */}

      {!loading && !hasItems && (
        <NoItems href={MarketRoutesConfig.Market.generatePath()} />
      )}

      {(loading || hasItems) && (
        <ProductCards isLoading={loading}>{renderedCards}</ProductCards>
      )}
    </>
  );
};
