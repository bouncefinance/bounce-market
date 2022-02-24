import axios from 'axios';
export interface IBlindBoxVerify {
  call_code: number;
  call_message: string;
}
export const getBlindBoxVerify = async (
  boxId: number,
  address: string,
): Promise<IBlindBoxVerify | void> => {
  if (!boxId) return console.log('get getBlindBoxVerify not tokenid');
  if (!address) return console.log('get getBlindBoxVerify not address');
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL_RINKEBY}/api/v2/rinkeby/proxy/blindBoxVerify`,
    {
      address,
      box_id: boxId,
    },
  );
  const data = res?.data?.data;
  return data;
};
