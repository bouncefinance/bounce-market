import { RequestAction } from '@redux-requests/core';
import { getTopArtistListUrl } from 'modules/api/getTopArtistList/api';
import {
  ITopArtistItem,
  mapTopArtistItem,
} from 'modules/api/getTopArtistList/mappers';
import { IApiTopArtistList } from 'modules/api/getTopArtistList/types';
import { createAction as createSmartAction } from 'redux-smart-actions';

export const getTopArtists = createSmartAction<
  RequestAction<IApiTopArtistList, ITopArtistItem[]>
>('getTopArtists', () => ({
  request: {
    url: getTopArtistListUrl,
    method: 'get',
  },
  meta: {
    asMutation: false,
    driver: 'axios',
    getData: data => {
      if (data.code !== 1) {
        console.error('getTopArtists: Unexpected response');
      }

      return (data.data || []).map(mapTopArtistItem).sort((a, b) => {
        return b.topWeight - a.topWeight;
      });
    },
  },
}));
