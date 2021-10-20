import { IApiSearchDrops, IApiSearchDropsItem } from './types';

const data: IApiSearchDropsItem[] = [
  {
    accountaddress: '0x55861bec5d65371b650da4c9df04aba11f46787a',
    bgcolor: '#319c85',
    coverimgurl: 'https://picsum.photos/800/400?random=1',
    created_at: '2021-07-05T12:33:14Z',
    description: 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890`!@#$%^&*()_+',
    display: 1,
    dropdate: 1625068800,
    id: 30,
    instagram: '',
    nfts: 5,
    state: 2,
    title: 'PDP Drop 1',
    twitter: '',
    updated_at: '2021-07-06T12:58:29Z',
    username: 'Javon JavonJavonJavonJavonJavonJavonJavonJavonJavonJavon',
    website: '',
    avatar: '',
    droptype: 1
  },
  {
    accountaddress: '0x26604a35b97d395a9711d839e89b44efcc549b21',
    bgcolor: '',
    coverimgurl: 'https://picsum.photos/800/400?random=2',
    created_at: '2021-07-05T09:59:29Z',
    description: 'Sobble 2',
    display: 1,
    dropdate: 1625479134,
    id: 25,
    instagram: 'Sobble 2',
    nfts: 3,
    state: 2,
    title: 'Sobble 2',
    twitter: 'Sobble 2',
    updated_at: '2021-07-06T12:58:29Z',
    username: 'hustler',
    website: 'Sobble 2',
    avatar: '',
    droptype: 1
  },
];

export const searchDropsDummy: IApiSearchDrops = {
  code: 1,
  data,
  total: data.length,
};
