import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import newsApi, { Article } from '../api/newsApi';

interface ArticleState {
  currentPage: number;
  selectedCategory: string;
  loading: boolean;
  articles: Article[];
  error?: string;

  searchQuery: string;
  searchLoading: boolean;
  searchArticles: Article[];
  searchError?: string;
}

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
      const response = await newsApi.fetchTopHeadlines(
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
      const response = await newsApi.fetchEverything(
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

const initialState: ArticleState = {
  currentPage: 1,
  selectedCategory: '',
  loading: false,
  articles: [],

  searchQuery: '',
  searchLoading: false,
  searchArticles: [],
};

export const newsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = undefined;
    },
    resetPage: (state) => {
      state.currentPage = 1;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchArticles = [];
      state.searchQuery = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch top headlines
      .addCase(fetchTopHeadlines.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchTopHeadlines.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchTopHeadlines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Search news
      .addCase(searchNews.pending, (state) => {
        state.searchLoading = true;
        state.searchError = undefined;
      })
      .addCase(searchNews.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchArticles = action.payload;
      })
      .addCase(searchNews.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.error.message;
      })
  }
});

export const {
  setSelectedCategory,
  clearError,
  resetPage,
  setSearchQuery,
  clearSearchResults
} = newsSlice.actions;

export default newsSlice.reducer;
