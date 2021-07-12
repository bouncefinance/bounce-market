export interface IApiTopArtistItem {
  id: number;
  bounceid: number;
  state: number;
  display: number;
  identity: number;
  email: string;
  bandimgurl: string;
  accountaddress: string;
  username: string;
  fullnam: string;
  bio: string;
  imgurl: string;
  website: string;
  instagram: string;
  twitter: string;
  facebook: string;
  created_at: string;
  updated_at: string;
  top_weight: number;
  hot_weight: number;
}

export interface IApiTopArtistList {
  code: number;
  data?: IApiTopArtistItem[];
  msg?: string;
}
