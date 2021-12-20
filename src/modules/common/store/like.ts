import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { getPoolKey } from '../utils/poolHelps';

type listMapType = Map<string, { isLike: boolean; likeCount: number }>;
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

export const setLikesMapDataAsync = (
  likes: {
    isLike: boolean;
    itemId: string;
    likeCount: number;
    poolId?: number;
  }[],
) => async (dispatch: any, state: RootState) => {
  const map: listMapType = new Map([...state.like.listMap]);
  (likes ?? []).forEach(like => {
    map.set(
      like?.poolId !== 0
        ? getPoolKey(
            (like as unknown) as {
              poolId: number;
              poolType: string;
            },
          )
        : like.itemId.toString(),
      {
        isLike: like.isLike,
        likeCount: like.likeCount,
      },
    );
  });
  dispatch(updateLikeMap(map));
};

export const setLikeCountAsync = (count: number) => async (dispatch: any) => {
  dispatch(updateLikeCount(count));
};
