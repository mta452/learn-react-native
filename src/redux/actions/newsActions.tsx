import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, getEverything, getTopHeadlines } from '../../api/newsApi';

export const NEWS_CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Business', value: 'business' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'General', value: 'general' },
  { label: 'Health', value: 'health' },
  { label: 'Science', value: 'science' },
  { label: 'Sports', value: 'sports' },
  { label: 'Technology', value: 'technology' },
];

interface FetchTopHeadlinesParams {
  country?: string;
  category?: string;
  pageSize?: number;
  page?: number;
}

interface SearchNewsParams {
  query: string,
  sortBy?: string,
  pageSize?: number,
  page?: number
}

export const fetchTopHeadlines = createAsyncThunk<
  Article[],
  FetchTopHeadlinesParams
>(
  'news/fetchTopHeadlines',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getTopHeadlines(
        params.country,
        params.category,
        params.pageSize,
        params.page
      );

      if (response.status === 'error') {
        return rejectWithValue(response.message);
      }

      return response.articles || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const searchNews = createAsyncThunk<
  Article[],
  SearchNewsParams
>(
  'news/search',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getEverything(
        params.query,
        params.sortBy,
        params.pageSize,
        params.page
      );

      if (response.status === 'error') {
        return rejectWithValue(response.message);
      }

      return response.articles || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
