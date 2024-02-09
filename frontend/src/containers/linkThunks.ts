import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosAPi.ts';
import {Link, Url} from '../types';

export const createLink = createAsyncThunk<Link,Url>(
  'links/create',
  async (urlInfo) => {
    const urlResponse = await axiosApi.post('/links', urlInfo);

    const response = urlResponse.data;
    console.log(urlResponse.data);

    const newUrlInfo: Link = {
      _id: response._id,
      shortUrl: response.shortUrl,
      originalUrl: response.originalUrl,
    };

    console.log(newUrlInfo);
    return newUrlInfo;
});

