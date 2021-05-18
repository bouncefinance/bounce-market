import { ZERO_ADDRESS } from 'modules/common/conts';
import { Seconds } from 'modules/common/types/unit';

export interface IApiBrand {
  contract_address: string;
  creator: string;
  owner: string;
  timestamp: Seconds;
}

export interface IApiQueryBrand {
  code: 200 | number;
  data: {
    erc721Total: number;
    erc1155Total: number;
    erc1155: IApiBrand[];
    erc721: IApiBrand[];
  };
}

export interface IBrandInfo {
    bandimgurl: string;
    brandname: string;
    brandsymbol: string;
    contractaddress: string;
    description: string;
    id: number;
    imgurl: string;
    owneraddress: string;
    ownerimg: string;
    ownername: string;
    popularweight: number;
    standard: number;
    status: number;
}

export interface IApiBrandInfo {
  code: 1 | number;
  data: IBrandInfo[];
}

export interface IApiBrandInfoItem {
  code: 1 | number;
  data: IBrandInfo;
}

export const compare = (a: string, b: string) => {
  return String(a).toLowerCase() === String(b).toLowerCase();
};

export const mapQueryBrandAddress = (
  { data }: IApiQueryBrand,
  address: string,
): string => {
  const brand721: IApiBrand | undefined = data.erc721.find((item: IApiBrand) =>
    compare(item.creator, address),
  );
  const brand1155:
    | IApiBrand
    | undefined = data.erc1155.find((item: IApiBrand) =>
      compare(item.creator, address),
    );
  if (brand721) {
    return brand721.contract_address;
  } else if (brand1155) {
    return brand1155.contract_address;
  } else {
    return ZERO_ADDRESS;
  }
};

export const mapQueryBrandList = ({ data }: IApiQueryBrand): IApiBrand[] => {
  const brand721: IApiBrand[] = data.erc721;
  const brand1155: IApiBrand[] = data.erc1155;
  return brand721.concat(brand1155);
}
