import { Box, Container } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { QueryLoading } from 'modules/common/components/QueryLoading/QueryLoading';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import {
  fetchNFTItems,
  INFTItem,
} from 'modules/overview/actions/fetchNFTItems';
import { mapNFTItem } from 'modules/overview/api/mapNFTItem';
import { ProductsPanel } from 'modules/overview/components/ProductsPanel';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useCallback, useEffect, useState } from 'react';
import { uid } from 'react-uid';

interface IProductsProps extends ISectionProps {
  cards?: JSX.Element;
  panel?: JSX.Element;
  loading?: boolean;
}

export const ProductsComponent = ({
  cards,
  panel,
  loading = false,
  ...sectionProps
}: IProductsProps) => {
  return (
    <Section {...sectionProps}>
      <Container>
        {panel && <Box mb={6}>{panel}</Box>}

        {loading ? (
          <Box
            py={5}
            position="relative"
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <QueryLoading />
          </Box>
        ) : (
          cards
        )}
      </Container>
    </Section>
  );
};

export const Products = ({ ...sectionProps }: ISectionProps) => {
  const { isConnected } = useAccount();
  const dispatch = useDispatchRequest();

  const { data, loading } = useQuery<INFTItem[]>({
    type: fetchNFTItems.toString(),
  });

  const [sortBy, setSortBy] = useState<string>('1');
  const [catergory, setCategory] = useState<ItemsChannel>(
    ItemsChannel.fineArts,
  );

  const onSortChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  const onCategoryChange = useCallback(
    (value: string) => {
      setCategory(value as ItemsChannel);
      dispatch(fetchNFTItems({ channel: value as ItemsChannel }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    dispatch(fetchNFTItems({}));
  }, [dispatch, isConnected]);

  const nftItems = data?.map(mapNFTItem);

  const rendrerdCards = (
    <ProductCards>
      {(nftItems || []).map(item => (
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
      ))}
    </ProductCards>
  );

  return isConnected ? (
    <ProductsComponent
      {...sectionProps}
      cards={nftItems && nftItems.length ? rendrerdCards : <NoItems />}
      loading={loading}
      panel={
        <ProductsPanel
          onSortChange={onSortChange}
          onCategoryChange={onCategoryChange}
          catergory={catergory}
          sortBy={sortBy}
          disabled={loading}
        />
      }
    />
  ) : null;
};
