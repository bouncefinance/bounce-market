
import { Brands } from './components/Brands';
import { useEffect, useState } from 'react';
import { useDispatchRequest } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { Section } from 'modules/uiKit/Section';
import { Container } from '@material-ui/core';
import { listBrands } from 'modules/brand/actions/listBrands';
import { IBrandInfo } from 'modules/brand/api/queryBrand';

export const ListBrand = () => {
  const dispatch = useDispatchRequest();
  const { address } = useAccount();
  const [brandList, setBrandList] = useState<IBrandInfo[]>([]);

  useEffect(() => {
    if (address) {
      dispatch(listBrands())
      .then(res=> {
        setBrandList(res.data);
      })
    }
  }, [address, dispatch]);

  return <Section>
    <Container maxWidth='lg'>
      <Brands data={brandList} />
    </Container>
  </Section>
}