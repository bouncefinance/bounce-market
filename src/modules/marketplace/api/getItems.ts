export interface IApiItem {
  fileurl: string;
  id: number;
  itemname: string;
  likecount: number;
  metadata: string;
}

export interface IItem extends IApiItem {}

export function mapItem(item: IApiItem): IItem {
  return item;
}
