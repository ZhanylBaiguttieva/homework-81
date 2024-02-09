import {configureStore} from "@reduxjs/toolkit";
import {linkReducer} from '../containers/linkSlice.ts';

export const  store = configureStore({
  reducer: {
    links: linkReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;