import { NoItems } from 'modules/common/components/NoItems';
import { ProductCardSkeleton } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { uid } from 'react-uid';
import { useEffect, useState } from 'react';
import { FtPoolCard } from 'modules/common/components/ProductCard/FtPoolCard';
import { Box, Container } from '@material-ui/core';

export const FtMarket: React.FC<{}> = function () {
  // const { data, loading } = useQuery<INftItem[]>({
  //   type: fetchOwned.toString(),
  // });
  const data: any[] = [
    1,2,3,4,5
  ]
  const [loading, setLoding] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setLoding(false)
    }, 500)
  }, [])

  return (
    <TabItemsComponent>
      <Container>
      <ProductCards isLoading={loading}>
        {loading ? (
          <ProductCardSkeleton />
        ) : (
          data?.map(item => (
            <FtPoolCard
              key={uid(item)}
              reload={() => {}}
              isOther={true}
              isMarket
              // hasAction={Boolean(artAddress && compare(artAddress, address))}
            />
          ))
        )}
      </ProductCards>
      {!loading && data?.length === 0 && (
        
        <NoItems />
      )}
      <Box mt={5}></Box>
      </Container>
    </TabItemsComponent>
  );
};
