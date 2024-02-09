import {Link} from '../types';
import {RootState} from '../app/store.ts';
import {createSlice} from '@reduxjs/toolkit';
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

    builder.addCase(createLink.fulfilled, (state) => {
      state.createLoading = false;
    });

    builder.addCase(createLink.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const linkReducer = linkSlice.reducer;

export const selectLink = (state: RootState) => state.links.item;
