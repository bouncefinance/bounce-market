import { gql } from '@apollo/client';
import { getApolloClient } from '../../common/api/getApolloClient';

export const QueryNftByUser = gql`
  query nftItems($user: String!) {
    nft721Items(where: { user: $user }) {
      tokenId
    }
    nft1155Items(where: { user: $user }) {
      tokenId
    }
  }
`;

interface IApiFetchNftByUserResponse {
  nft721Items: {
    tokenId: 17177;
    __typename: 'NFT721Item';
  }[];
  nft1155Items: {
    tokenId: 17177;
    __typename: 'NFT1155tem';
  }[];
}

interface IFetchNftByUserResponse {
  nft721Items: {
    tokenId: 17177;
  }[];
  nft1155Items: {
    tokenId: 17177;
  }[];
}

export interface IApiFetchNftByUserVariables {
  user: string;
}

export async function fetchNftByUser(
  payload: IApiFetchNftByUserVariables,
): Promise<IFetchNftByUserResponse> {
  const query = await getApolloClient().query<
    IApiFetchNftByUserResponse,
    IApiFetchNftByUserVariables
  >({
    query: QueryNftByUser,
    variables: payload,
  });

  return query.data;
}
