import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosAPi.ts';
import {Link} from '../types';

export const createLink = createAsyncThunk(
  'links/create',
  async (urlInfo: Link) => {
    const urlResponse = await axiosApi.post< Link| null>('/links', urlInfo);

    const response = urlResponse.data;
    console.log(urlResponse.data);

    if(!response) {
      return '';
    }

    const newUrlInfo: Link = {
      _id: response._id,
      shortUrl: response.shortUrl,
      originalUrl: response.originalUrl,
    };

    console.log(newUrlInfo);
    return newUrlInfo;

});

