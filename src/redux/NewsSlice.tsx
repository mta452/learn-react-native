import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../api/newsApi';
import { fetchTopHeadlines, searchNews } from './actions/newsActions';

interface ArticleState {
  currentPage: number;
  selectedCategory: string;
  loading: boolean;
  articles: Article[];
  error?: string;

  searchPage: number;
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

  searchPage: 1,
  searchQuery: '',
  searchLoading: false,
  searchArticles: []
};

export const newsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    clearError: (state) => {
      state.error = undefined;
    },
    resetCurrentPage: (state) => {
      state.currentPage = 1;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.searchPage = 1;
    },
    clearSearchResults: (state) => {
      state.searchArticles = [];
      state.searchQuery = '';
      state.searchPage = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch top headlines
      .addCase(fetchTopHeadlines.pending, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.loading = true;
        }
        state.error = undefined;
      })
      .addCase(fetchTopHeadlines.fulfilled, (state, action) => {
        state.loading = false;

        if (action.meta.arg.page === 1) {
          state.articles = action.payload;
        } else {
          state.articles.push(...action.payload);
        }

        state.currentPage += 1;

        console.log(`Fetch headlines to page ${state.currentPage}`);
      })
      .addCase(fetchTopHeadlines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.toString();
      })

      // Search news
      .addCase(searchNews.pending, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.searchLoading = true;
        }
        state.searchError = undefined;
      })
      .addCase(searchNews.fulfilled, (state, action) => {
        state.searchLoading = false;

        if (action.meta.arg.page === 1) {
          state.searchArticles = action.payload;
        } else {
          state.searchArticles.push(...action.payload);
        }

        state.searchPage += 1;
      })
      .addCase(searchNews.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload?.toString();
      })
  }
});

export const {
  setSelectedCategory,
  clearError,
  resetCurrentPage,
  setSearchQuery,
  clearSearchResults
} = newsSlice.actions;

export default newsSlice.reducer;
