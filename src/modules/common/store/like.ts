import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILikedItem } from 'modules/profile/actions/queryLikedItems';
import { getPoolKey } from '../utils/poolHelps';

type listMapType = Map<string, boolean>;
export interface ILikeState {
  listMap: listMapType;
  count: number;
}

const initialState: ILikeState = {
  listMap: new Map(),
  count: 0,
};

export const likeSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    updateLikeMap: (state, action: PayloadAction<listMapType>) => {
      state.listMap = action.payload;
    },
    updateLikeCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});
const { updateLikeMap, updateLikeCount } = likeSlice.actions;

export const setLikesMapDataAsync = (likes: ILikedItem[]) => async (
  dispatch: any,
) => {
  const map = new Map<string, boolean>();
  (likes ?? []).forEach(like => {
    map.set(
      like.poolId !== 0
        ? getPoolKey(
            (like as unknown) as {
              poolId: number;
              poolType: string;
            },
          )
        : like.itemId.toString(),
      true,
    );
  });
  dispatch(updateLikeMap(map));
  dispatch(updateLikeCount(likes.length));
};
