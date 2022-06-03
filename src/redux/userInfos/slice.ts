import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './state';

export const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser(state, action: PayloadAction<any, string>) {
      state!.userInfo = action.payload;
    },
  },
});

export const { getUser } = actions;
