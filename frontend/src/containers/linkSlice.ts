import {Link} from '../types';
import {RootState} from '../app/store.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createLink} from './linkThunks.ts';

interface LinkState {
  item: Link | null;
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: LinkState = {
  item: null,
  fetchLoading: false,
  createLoading: false,
};

export const linkSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(createLink.pending, (state) => {
      state.createLoading = true;
    });

    builder.addCase(createLink.fulfilled, (state, {payload: item}:PayloadAction<Link> ) => {
      state.createLoading = false;
      state.item = item;
    });

    builder.addCase(createLink.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const linkReducer = linkSlice.reducer;

export const selectLink = (state: RootState) => state.links.item;
