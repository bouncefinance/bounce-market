import axios from 'axios';
export interface IMetadataInfo {
  description: string;
  image: string;
  name: string;
  external_url: string;
}
export const getMetaData = async (tokenId: string) => {
  if (!tokenId) {
    console.log('get metadata not tokenid');
  }
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL_RINKEBY}/game/v1/metadata/${tokenId}/en`,
  );
  const data = res.data.data as IMetadataInfo;
  return data;
};
