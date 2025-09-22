import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../api/newsApi';
import { fetchTopHeadlines, searchNews } from './actions/newsActions';

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
