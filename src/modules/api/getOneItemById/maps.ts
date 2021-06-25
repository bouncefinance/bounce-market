import { IApiGetOneItemByIdData } from './types';

export interface IGetOneItemById {
  balance: IApiGetOneItemByIdData['balance'];
  category: IApiGetOneItemByIdData['category'];
  channel: IApiGetOneItemByIdData['channel'];
  contractAddress: IApiGetOneItemByIdData['contractaddress'];
  createdAt: Date;
  description: IApiGetOneItemByIdData['description'];
  externalLink: IApiGetOneItemByIdData['externallink'];
  fileUrl: IApiGetOneItemByIdData['fileurl'];
  id: IApiGetOneItemByIdData['id'];
  itemName: IApiGetOneItemByIdData['itemname'];
  itemSymbol: IApiGetOneItemByIdData['itemsymbol'];
  likeCount: IApiGetOneItemByIdData['likecount'];
  compressedImgUrl: IApiGetOneItemByIdData['litimgurl'];
  metadata: IApiGetOneItemByIdData['metadata'];
  ownerAddress: IApiGetOneItemByIdData['owneraddress'];
  standard: IApiGetOneItemByIdData['standard'];
  supply: IApiGetOneItemByIdData['supply'];
}

export const mapGetOneItemById = (
  data: IApiGetOneItemByIdData,
): IGetOneItemById => {
  return {
    balance: data.balance,
    category: data.category,
    channel: data.channel,
    contractAddress: data.contractaddress,
    createdAt: new Date(data.created_at),
    description: data.description,
    externalLink: data.externallink,
    fileUrl: data.fileurl,
    id: data.id,
    itemName: data.itemname,
    itemSymbol: data.itemsymbol,
    likeCount: data.likecount,
    compressedImgUrl: data.litimgurl,
    metadata: data.metadata,
    ownerAddress: data.owneraddress,
    standard: data.standard,
    supply: data.supply,
  };
};