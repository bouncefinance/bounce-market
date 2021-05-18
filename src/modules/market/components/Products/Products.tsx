import { Box, Container } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { IProductCardProps } from 'modules/common/components/ProductCard';
import { QueryLoading } from 'modules/common/components/QueryLoading/QueryLoading';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import {
  fetchNFTItems,
  INFTItem,
} from 'modules/overview/actions/fetchNFTItems';
import { mapNFTItems } from 'modules/overview/api/mapNFTItems';
import { ProductsList } from 'modules/overview/components/ProductsList';
import { ProductsPanel } from 'modules/overview/components/ProductsPanel';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useCallback, useEffect, useState } from 'react';

type IImgProps = Omit<IProductCardProps, 'MediaProps'> & {
  img: string;
};

type IVideoProps = Omit<IProductCardProps, 'MediaProps'> & {
  video: string;
};

export type ProductProps = IImgProps | IVideoProps;

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

  const { data, loading } = useQuery<INFTItem[] | null>({
    type: fetchNFTItems.toString(),
  });

  const [sortBy, setSortBy] = useState<string>('0');
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

  return isConnected ? (
    <ProductsComponent
      {...sectionProps}
      cards={<ProductsList items={mapNFTItems(data || [])} />}
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
